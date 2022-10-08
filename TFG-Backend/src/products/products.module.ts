import {TypeOrmModule} from "@nestjs/typeorm";
import {Global, Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {WinstonModule} from "nest-winston";
import {ThrottlerModule} from "@nestjs/throttler";
import { Product } from "./entities/product.entity";
import { UsersModule } from "../users/users.module";
import { ProductsService } from "./services/products.service";
import { ProductsController } from "./controllers/products.controller";
import { ConfigJwtModule } from "../configJwt/configJwt.module";
import { MulterModule } from "@nestjs/platform-express";
import { ProductImage } from "./entities/productimage.entity";
import { ProductImagesService } from "./services/productImages.service";

@Global()
@Module({
    imports: [
        MulterModule.register({
            dest: './files',
        }),
        TypeOrmModule.forFeature([Product,ProductImage]),
        ConfigJwtModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        WinstonModule,
        ThrottlerModule,
        UsersModule,
    ],
    providers: [ProductsService,ProductImagesService],
    controllers: [ProductsController],
    exports: [ProductsService,ProductImagesService],
})
export class ProductsModule {}
