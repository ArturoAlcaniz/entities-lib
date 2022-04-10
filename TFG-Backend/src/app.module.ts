import {Response, Request} from "express";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/entities/user.entity";
import {ConfigJwtModule} from "./configJwt/configJwt.module";
import {AppController} from "./app.controller";
import {HashingModule} from "./hashing/hashing.module";
import {UsersModule} from "./users/users.module";
import {
    Module,
    NestMiddleware,
    MiddlewareConsumer,
    RequestMethod,
} from "@nestjs/common";
import path from "path";
import {HttpModule} from "@nestjs/axios";
import {ThrottlerModule} from "@nestjs/throttler";
import {WinstonModule} from "nest-winston";
import * as winston from "winston";
import {MailerModule} from "./mailer/mailer.module";

const resolvePath = (file: string) => path.resolve(`./dist/ui_v1/${file}`);

class FrontendMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        res.sendFile(resolvePath("index.html"));
    }
}

function getRoute(route: string) {
    return {
        path: route,
        method: RequestMethod.ALL,
    };
}

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        ConfigJwtModule,
        TypeOrmModule.forRoot({
            type: "mariadb",
            host: "mariadb",
            port: 3306,
            username: "root",
            password: "123456",
            database: "tfg",
            entities: [User],
            synchronize: true,
            autoLoadEntities: true,
        }),
        HashingModule,
        MailerModule,
        UsersModule,
        HttpModule,
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        WinstonModule.forRoot({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    dirname: path.join(__dirname, "./../log/info/"),
                    filename: "info.log",
                    level: "info",
                }),
            ],
        }),
    ],
    providers: [],
    controllers: [AppController],
    exports: [WinstonModule, ThrottlerModule],
})
export class ApplicationModule {
    configure(frontEnd: MiddlewareConsumer) {
        frontEnd.apply(FrontendMiddleware);
    }
}
