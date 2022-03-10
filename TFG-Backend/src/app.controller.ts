import { BadRequestException, Body, Post, Redirect, Render, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Controller, Get } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { LoginDto } from "./users/dtos/login.dto";
import { UsersService } from "./users/services/users.service";
import { Request, response, Response } from 'express';

@Controller()
export class AppController {
    usersLoggedIn: Map<string, string> =  new Map<string, string>();
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    @Get('')
    async noRoute(){
        return;
    }

    @Get('home')
    async home(){
        return;
    }

    @Post('login')
    async login(
        @Body() payload: LoginDto,
        @Res( {passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        let user: User = await this.usersService.findOne({ where: { EMAIL: payload.email}});

        if(user == null || !this.usersService.verifyPass(user, payload.pass)){
            response.status(400).json({ message: ['invalid_credentials'] })
            return;
        }

        const jwt = this.jwtService.sign({ userId: user.ID })
        this.usersLoggedIn.set(user.ID, jwt)

        response.cookie('jwt', jwt, {httpOnly: true, sameSite: "strict", secure: true});
        response.status(200).json({ message: ['successfully_logged_in'] })

    }

    @Get('user')
    async user(
        @Req() request: Request
    ){

        if(!request.cookies['jwt']){
            response.status(400).json({ message: ['not_logged_in'] })
        }

        const cookie = request.cookies['jwt'];

        if(!this.jwtService.verify(cookie)){
            throw new UnauthorizedException();
        }

        const user = (this.jwtService.decode(cookie))['userId']

        if(cookie != this.usersLoggedIn.get(user)) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
