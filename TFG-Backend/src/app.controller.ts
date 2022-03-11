import { BadRequestException, Body, Post, Redirect, Render, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Controller, Get } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { LoginDto } from "./users/dtos/login.dto";
import { UsersService } from "./users/services/users.service";
import { Request, response, Response } from 'express';
import { AuthenticatedGuard } from './users/guards/authenticated.guard';

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

    @Get('user')
    @UseGuards(AuthenticatedGuard)
    async user(
        @Req() request: Request
    ){

        return request.user
    }
}
