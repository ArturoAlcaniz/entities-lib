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
import { ModifyProductDto } from "../dtos/modifyProduct.dto";
import { DeleteProductDto } from "../dtos/deleteProduct.dto";

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
    @Throttle(100, 3000)
    @ApiOkResponse()
    @Post("delete")
    @UseGuards(AuthenticatedGuard)
    async delete(
        @Body() payload: DeleteProductDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request,
    ) {
        let user: User = await this.usersService.findOne({
            where: {
                ID: this.jwtService.decode(request.cookies["jwt"])["userId"],
            },
        });

        let product: Product = await this.productsService.findOne({
            where: {
                ID: payload.id,
                USER: user,
            },
        });

        await this.productImagesService.deleteMany(await this.productImagesService.find({
            where: {
                PRODUCT: product
            }
        }))

        if (await this.productsService.remove(product)) {
            response.status(200).json({message: ["successfully_product_deleted"]});
        }
    }


    @UseGuards(ThrottlerGuard)
    @Throttle(100, 3000)
    @ApiOkResponse()
    @Post("modify")
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(
	    FilesInterceptor('images')
    )
    async modify(
        @Body() payload: ModifyProductDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request,
        @UploadedFiles() images: Array<Express.Multer.File>
    ) {
        let user: User = await this.usersService.findOne({
            where: {
                ID: this.jwtService.decode(request.cookies["jwt"])["userId"],
            },
        });

        let product: Product = await this.productsService.findOne({
            where: {
                ID: payload.id,
                USER: user,
            },
        });

        this.productImagesService.deleteMany(await this.productImagesService.find({
            where: {
                PRODUCT: product
            }
        }))
        
        product.PRODUCTNAME = payload.productname;
        product.DESCRIPTION = payload.description;
        product.CATEGORY = payload.category;
        product.STARTS = payload.startsell == "" ? null : payload.startsell;
        product.ENDS = payload.endsell == "" ? null : payload.endsell;
        product.PRICE = payload.price;

        let productImages: ProductImage[] = []
        
        images.forEach(value => {
            let productImage: ProductImage = this.productImagesService.createProductImage(value.filename,product)
            productImages.push(productImage)
        })

        if(this.productImagesService.saveMany(productImages)){
            response.status(200).json({message: ["successfully_product_modified"]});
        }
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(100, 3000)
    @ApiOkResponse()
    @Post("modifyWithoutImages")
    @UseGuards(AuthenticatedGuard)
    async modifyWithoutImages(
        @Body() payload: ModifyProductDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        let user: User = await this.usersService.findOne({
            where: {
                ID: this.jwtService.decode(request.cookies["jwt"])["userId"],
            },
        });

        let product: Product = await this.productsService.findOne({
            where: {
                ID: payload.id,
                USER: user,
            },
        });

        product.PRODUCTNAME = payload.productname;
        product.DESCRIPTION = payload.description;
        product.CATEGORY = payload.category;
        product.STARTS = payload.startsell == "" ? null : payload.startsell;
        product.ENDS = payload.endsell == "" ? null : payload.endsell;
        product.PRICE = payload.price;

        this.productsService.save(product);
        response.status(200).json({message: ["successfully_product_modified"]});
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(100, 3000)
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
        
        let products: Product[] = await this.productsService.getRepository().createQueryBuilder('product')
        .where('USERID = :uid', { uid: user.ID })
        .leftJoinAndSelect('product.IMAGES', 'product_image')
        .getMany()

        return products;
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(100, 3000)
    @ApiOkResponse()
    @Get("obtainAllAvailable")
    @UseGuards(AuthenticatedGuard)
    async getAllProducts(
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        
        let products: Product[] = await this.productsService.find({
            relations: ['IMAGES'],
            loadRelationsId: true,
            where: {
                BUYER: null
            },
        })

        return products;
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 3000)
    @ApiOkResponse()
    @Get("obtain/:product")
    @UseGuards(AuthenticatedGuard)
    async getProduct(
        @Param('product') product: string,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        let user: User = await this.usersService.findOne({
            where: {
                ID: this.jwtService.decode(request.cookies["jwt"])["userId"],
            },
        });

        let products: Product[] = await this.productsService.getRepository().createQueryBuilder('product')
        .where('product.ID = :pid', { pid: product })
        .leftJoinAndSelect('product.IMAGES', 'product_image')
        .getMany()

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