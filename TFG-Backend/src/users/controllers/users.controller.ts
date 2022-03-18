import { LoginDto } from './../dtos/login.dto';
import { Body, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from "../dtos/createUser.dto";
import { User } from "../entities/user.entity";
import { UsersService } from "../services/users.service";
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { LoginGoogleDto } from '../dtos/loginGoogle.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private jwtService: JwtService, private httpService: HttpService) {}

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
        response.status(200).json({ message: ['successfully_logged_in'], USERNAME: user.USERNAME })

    }

    @Post('loginGoogle')
    async loginGoogle(
        @Body() payload: LoginGoogleDto,
        @Res( {passthrough: true}) response: Response
        ) {
            const infoUserGoogle = await firstValueFrom(this.httpService.get('https://oauth2.googleapis.com/tokeninfo?id_token='+payload.token));
            const validated = this.usersService.validateLoginGoogle(infoUserGoogle.data)
            
            if(!validated){
                response.status(400).json({ message: ['google_login_not_valid'] })
                return;
            }

            if(!(await this.usersService.checkExistGoogleEmail(infoUserGoogle.data))){
                await this.usersService.registerGoogleAccount(infoUserGoogle.data)
            }

            let user: User = (await this.usersService.findOne({ where: { EMAIL: infoUserGoogle.data.email}}));

            if(user == null){
                response.status(400).json({ message: ['invalid_credentials'] })
                return;
            }

            const jwt = this.jwtService.sign({ userId: user.ID })
            this.usersService.usersLoggedIn.set(user.ID, jwt)
    
            response.cookie('jwt', jwt, {httpOnly: true, sameSite: "strict", secure: true});
            response.status(200).json({ message: ['successfully_logged_in'], USERNAME: user.USERNAME })
    }

    @Get('logout')
    @UseGuards(AuthenticatedGuard)
    async logout(
        @Res( {passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        this.usersService.usersLoggedIn.delete(request.user.userId)
        response.clearCookie('jwt')
    }

}