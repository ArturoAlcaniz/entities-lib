import {TypeOrmModule} from "@nestjs/typeorm";
import {Global, Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {WinstonModule} from "nest-winston";
import {ThrottlerModule} from "@nestjs/throttler";
import {MailerModule} from "../mailer/mailer.module";
import { Product } from "./entities/product.entity";
import { UsersModule } from "../users/users.module";
import { ProductsService } from "./services/products.service";
import { ProductsController } from "./controllers/products.controller";
import { ConfigJwtModule } from "../configJwt/configJwt.module";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        ConfigJwtModule,
        MailerModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        WinstonModule,
        ThrottlerModule,
        UsersModule,
    ],
    providers: [ProductsService],
    controllers: [ProductsController],
    exports: [ProductsService],
})
export class ProductsModule {}
