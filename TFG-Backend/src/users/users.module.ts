import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigJwtModule } from './../configJwt/configJwt.module';
import { HashingModule } from './../hashing/hashing.module';
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { User } from './entities/user.entity';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ConfigJwtModule,
        HashingModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})

export class UsersModule {}
