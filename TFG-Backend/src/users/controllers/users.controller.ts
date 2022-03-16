import { LoginDto } from './../dtos/login.dto';
import { Body, Param, Post, Req, Res } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from "../dtos/createUser.dto";
import { User } from "../entities/user.entity";
import { UsersService } from "../services/users.service";
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    @Post('register')
    async createUser(@Body() payload: CreateUserDto, @Res( {passthrough: true}) response: Response){
        let user: User = this.usersService.createUser(payload.email, payload.username, payload.pass);

        if(!(await this.usersService.validateUniqueEmail(user))){
            response.status(400).json({ message: ['email_already_exist'] })
            return;
        }

        if(!(await this.usersService.validateUniqueUsername(user))){
            response.status(400).json({ message: ['username_already_exist'] })
            return;
        }
        this.usersService.save(user);
        response.status(200).json({ message: ['successfully_registered'] })
    }

    @Post('login')
    async login(
        @Body() payload: LoginDto,
        @Res( {passthrough: true}) response: Response
    ) {
        let user: User = await this.usersService.findOne({ where: { EMAIL: payload.email}});

        if(user == null || !this.usersService.verifyPass(user, payload.pass)){
            response.status(400).json({ message: ['invalid_credentials'] })
            return;
        }

        const jwt = this.jwtService.sign({ userId: user.ID })
        this.usersService.usersLoggedIn.set(user.ID, jwt)

        response.cookie('jwt', jwt, {httpOnly: true, sameSite: "strict", secure: true});
        response.status(200).json({ message: ['successfully_logged_in'] })

    }

}