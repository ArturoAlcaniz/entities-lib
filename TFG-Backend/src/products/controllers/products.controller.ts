import {Body, Inject, Post, Req, Res, UseGuards, Controller, Get} from "@nestjs/common";
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
import { CreateProductDto } from "../dtos/createUser.dto";
import { Product } from "../entities/product.entity";
import { ProductsService } from "../services/products.service";

@ApiTags("Product Controller")
@Controller("products")
export class ProductsController {
    constructor(
        private usersService: UsersService,
        private productsService: ProductsService,
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
    async createUserSendCode(
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
            payload.price,
            user
        );

        this.productsService.save(product);
        response.status(200).json({message: ["successfully_product_created"]});
    }
}