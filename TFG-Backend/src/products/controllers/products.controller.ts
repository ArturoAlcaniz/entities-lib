import {Body, Inject, Post, Req, Res, UseGuards, Controller, Get, UseInterceptors, UploadedFiles, Param, StreamableFile} from "@nestjs/common";
import {Response, Request} from "express";
import {User} from "../../users/entities/user.entity";
import {UsersService} from "../../users/services/users.service";
import {JwtService} from "@nestjs/jwt";
import {AuthenticatedGuard} from "../../users/guards/authenticated.guard";
import {HttpService} from "@nestjs/axios";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Logger} from "winston";
import {Throttle, ThrottlerGuard} from "@nestjs/throttler";
import {MailerService} from "../../mailer/mailer.service";
import { CreateProductDto } from "../dtos/createProduct.dto";
import { Product } from "../entities/product.entity";
import { ProductsService } from "../services/products.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ProductImage } from "../entities/productimage.entity";
import { ProductImagesService } from "../services/productImages.service";
import fs, { createReadStream } from 'fs';
import { join } from "path";

@ApiTags("Product Controller")
@Controller("products")
export class ProductsController {
    constructor(
        private usersService: UsersService,
        private productsService: ProductsService,
        private productImagesService: ProductImagesService,
        private jwtService: JwtService,
        private httpService: HttpService,
        private mailerService: MailerService,
        @Inject("winston")
        private readonly logger: Logger
    ) {}

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 3000)
    @ApiOkResponse()
    @Post("create")
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(
	    FilesInterceptor('images')
    )
    async create(
        @Body() payload: CreateProductDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request,
        @UploadedFiles() images: Array<Express.Multer.File>
    ) {
        let user: User = await this.usersService.findOne({
            where: {
                ID: this.jwtService.decode(request.cookies["jwt"])["userId"],
            },
        });

        let product: Product = this.productsService.createProduct(
            payload.productname,
            payload.description,
            payload.category,
            payload.startsell == "" ? null : payload.startsell,
            payload.endsell == "" ? null : payload.endsell,
            payload.price,
            user
        );

        let productImages: ProductImage[] = []
      
        images.forEach(value => {
            let productImage: ProductImage = this.productImagesService.createProductImage(value.filename,product)
            productImages.push(productImage)
        })

        if(this.productImagesService.saveMany(productImages)){
            response.status(200).json({message: ["successfully_product_created"]});
        }
    }
    
    @UseGuards(ThrottlerGuard)
    @Throttle(10, 3000)
    @ApiOkResponse()
    @Post("createWithoutImages")
    @UseGuards(AuthenticatedGuard)
    async createWithoutImages(
        @Body() payload: CreateProductDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        let user: User = await this.usersService.findOne({
            where: {
                ID: this.jwtService.decode(request.cookies["jwt"])["userId"],
            },
        });

        let product: Product = this.productsService.createProduct(
            payload.productname,
            payload.description,
            payload.category,
            payload.startsell == "" ? null : payload.startsell,
            payload.endsell == "" ? null : payload.endsell,
            payload.price,
            user
        );

        this.productsService.save(product);
        response.status(200).json({message: ["successfully_product_created"]});
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 3000)
    @ApiOkResponse()
    @Get("obtain")
    @UseGuards(AuthenticatedGuard)
    async getProducts(
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        let user: User = await this.usersService.findOne({
            where: {
                ID: this.jwtService.decode(request.cookies["jwt"])["userId"],
            },
        });

        let products: Product[] = await this.productsService.find({
            relations: ['IMAGES'],
            loadRelationsId: true,
            where: {
                USER: user
            },
        })

        return products;
    }
    
    @UseGuards(ThrottlerGuard)
    @Throttle(100, 3000)
    @ApiOkResponse()
    @Get("image/:product")
    @UseGuards(AuthenticatedGuard)
    async getAvatar(
        @Param('product') product: string,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request,
    ) {

        let file = "files/{FILENAME}".replace(
            "{FILENAME}",
            product
        )
        if (fs.existsSync(file)) {
            const f = createReadStream(join(process.cwd(), file));
            return new StreamableFile(f);
        }
    }
}