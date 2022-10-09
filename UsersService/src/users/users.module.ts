import {TypeOrmModule} from "@nestjs/typeorm";
import {HashingModule} from "../hashing/hashing.module";
import {UsersController} from "./controllers/users.controller";
import {UsersService} from "./services/users.service";
import {User} from "entities-lib/src/entities/user.entity";
import {Global, Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {WinstonModule} from "nest-winston";
import {ThrottlerModule} from "@nestjs/throttler";
import { jwtConfig } from "config-lib/src/jwt.config";
import { MulterModule } from '@nestjs/platform-express';
import { SessionsController } from "./controllers/session.controller";
import { Payment } from "entities-lib/src/entities/payment.entity";
import { PaymentsService } from "./services/payments.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticatedController } from "./controllers/authenticated.controller";

@Global()
@Module({
    imports: [
        MulterModule.register({
            dest: './files',
        }),
        TypeOrmModule.forFeature([User,Payment]),
        JwtModule.register(jwtConfig()),
        HashingModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        WinstonModule,
        ThrottlerModule,
    ],
    providers: [UsersService,PaymentsService],
    controllers: [UsersController, SessionsController, AuthenticatedController],
    exports: [UsersService,PaymentsService,JwtModule],
})
export class UsersModule {}
