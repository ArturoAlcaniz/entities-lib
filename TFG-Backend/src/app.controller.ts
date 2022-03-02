import { BadRequestException, Body, Post, Redirect, Render, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Controller, Get } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { LoginDto } from "./users/dtos/login.dto";
import { UsersService } from "./users/services/users.service";
import { Request, Response } from 'express';

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
        @Res( {passthrough: true}) response: Response
    ) {
        let user: User = await this.usersService.findOne({ where: { EMAIL: payload.email}});

        if(user == null || !this.usersService.verifyPass(user, payload.pass)){
            response.status(400).json({ message: ['invalid_credentials'] })
            return;
        }

        if(this.usersLoggedIn.has(user.ID)){
            response.status(400).json({ message: ['already_logged_in'] })
            return;
        }

        const jwt = this.jwtService.sign({ userId: user.ID })
        this.usersLoggedIn.set(user.ID, jwt)

        response.cookie('jwt', jwt, {httpOnly: true, sameSite: "strict", secure: true});
 
    }

    @Get('user')
    async user(@Req() request: Request){
        const cookie = request.cookies['jwt'];

        if(!this.jwtService.verify(cookie)){
            throw new UnauthorizedException();
        }

        return cookie;
    }
}
