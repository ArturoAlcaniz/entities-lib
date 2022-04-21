import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigJwtModule} from "./../configJwt/configJwt.module";
import {HashingModule} from "./../hashing/hashing.module";
import {UsersController} from "./controllers/users.controller";
import {UsersService} from "./services/users.service";
import {User} from "./entities/user.entity";
import {Global, Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {WinstonModule} from "nest-winston";
import {ThrottlerModule} from "@nestjs/throttler";
import {MailerModule} from "../mailer/mailer.module";
import { MulterModule } from '@nestjs/platform-express';
import { SessionsController } from "./controllers/session.controller";

@Global()
@Module({
    imports: [
        MulterModule.register({
            dest: './files',
        }),
        TypeOrmModule.forFeature([User]),
        ConfigJwtModule,
        HashingModule,
        MailerModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        WinstonModule,
        ThrottlerModule,
    ],
    providers: [UsersService],
    controllers: [UsersController, SessionsController],
    exports: [UsersService],
})
export class UsersModule {}
