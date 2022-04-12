import {JwtService} from "@nestjs/jwt";
import {Controller, Get, Req, UseGuards} from "@nestjs/common";
import {User} from "./users/entities/user.entity";
import {UsersService} from "./users/services/users.service";
import {Request} from "express";
import {AuthenticatedGuard} from "./users/guards/authenticated.guard";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("APP Controller")
@Controller()
export class AppController {
    usersLoggedIn: Map<string, string> = new Map<string, string>();
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    @ApiOkResponse({type: User})
    @Get("user")
    @UseGuards(AuthenticatedGuard)
    async user(@Req() request: Request) {
        return request.user;
    }
}
