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
import { Payment } from "./entities/payment.entity";
import { PaymentsService } from "./services/payments.service";

@Global()
@Module({
    imports: [
        MulterModule.register({
            dest: './files',
        }),
        TypeOrmModule.forFeature([User,Payment]),
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
    providers: [UsersService,PaymentsService],
    controllers: [UsersController, SessionsController],
    exports: [UsersService,PaymentsService],
})
export class UsersModule {}
