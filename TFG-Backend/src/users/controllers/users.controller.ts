import { LoginDto } from './../dtos/login.dto';
import { Body, Param, Post, Res } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from "../dtos/createUser.dto";
import { User } from "../entities/user.entity";
import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('register')
    async createUser(@Body() payload: CreateUserDto, @Res( {passthrough: true}) response: Response){
        let user: User = this.usersService.createUser(payload.email, payload.name, payload.pass);
        this.usersService.save(user);
        return true;
    }

}