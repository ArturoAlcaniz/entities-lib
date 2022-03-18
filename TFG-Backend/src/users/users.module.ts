import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigJwtModule } from './../configJwt/configJwt.module';
import { HashingModule } from './../hashing/hashing.module';
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { User } from './entities/user.entity';
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ConfigJwtModule,
        HashingModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,  
        })
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})

export class UsersModule {}
