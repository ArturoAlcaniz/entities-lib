import {LoginDto} from "./../dtos/login.dto";
import {Body, Inject, Post, Req, Res, UseGuards} from "@nestjs/common";
import {Controller, Get} from "@nestjs/common";
import {Response, Request} from "express";
import {CreateUserDto} from "../dtos/createUser.dto";
import {User} from "../entities/user.entity";
import {UsersService} from "../services/users.service";
import {JwtService} from "@nestjs/jwt";
import {AuthenticatedGuard} from "../guards/authenticated.guard";
import {LoginGoogleDto} from "../dtos/loginGoogle.dto";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Logger} from "winston";
import {UserBlocked} from "../types/user-blocked.type";
import {Throttle, ThrottlerGuard} from "@nestjs/throttler";

@ApiTags("User Controller")
@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private httpService: HttpService,
        @Inject("winston")
        private readonly logger: Logger
    ) {}

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 3000)
    @ApiOkResponse()
    @Post("register")
    async createUser(
        @Body() payload: CreateUserDto,
        @Res({passthrough: true}) response: Response
    ) {
        let user: User = this.usersService.createUser(
            payload.email,
            payload.username,
            payload.pass
        );

        if (!(await this.usersService.validateUniqueEmail(user))) {
            response
                .status(400)
                .json({message: ["email_already_exist"], formError: "email"});
            return;
        }

        if (!(await this.usersService.validateUniqueUsername(user))) {
            response.status(400).json({
                message: ["username_already_exist"],
                formError: "username",
            });
            return;
        }
        this.usersService.save(user);
        response.status(200).json({message: ["successfully_registered"]});
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 60)
    @ApiOkResponse()
    @Post("login")
    async login(
        @Body() payload: LoginDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        let user: User = await this.usersService.findOne({
            where: {EMAIL: payload.email},
        });

        if (this.verifyBlockUser(request, payload.email)) {
            response.status(400).json({
                message: ["too_many_attempts"],
                formError: "too_many_attempts",
                bannedDuring: this.obtainSecondsBanned(request, payload.email),
            });
            this.logger.info(
                "Fail Login (attempts) {IP}".replace(
                    "{IP}",
                    request.headers["x-forwarded-for"].toString()
                )
            );
            return;
        }

        if (user == null || !this.usersService.verifyPass(user, payload.pass)) {
            response.status(400).json({
                message: ["invalid_credentials"],
                formError: "password",
            });
            this.logger.info(
                "Fail Login (invalid) {IP}".replace(
                    "{IP}",
                    request.headers["x-forwarded-for"].toString()
                )
            );
            this.countFailAttempt(request, payload.email);
            return;
        }

        const jwt = this.jwtService.sign({userId: user.ID});
        this.usersService.usersLoggedIn.set(user.ID, jwt);

        response.cookie("jwt", jwt, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        response.status(200).json({
            message: ["successfully_logged_in"],
            USERNAME: user.USERNAME,
        });
        this.logger.info(
            "Login Sucessfully {IP}".replace(
                "{IP}",
                request.headers["x-forwarded-for"].toString()
            )
        );
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 60)
    @ApiOkResponse()
    @Post("loginGoogle")
    async loginGoogle(
        @Body() payload: LoginGoogleDto,
        @Res({passthrough: true}) response: Response
    ) {
        const infoUserGoogle = await firstValueFrom(
            this.httpService.get(
                "https://oauth2.googleapis.com/tokeninfo?id_token=" +
                    payload.token
            )
        );
        const validated = this.usersService.validateLoginGoogle(
            infoUserGoogle.data
        );

        if (!validated) {
            response.status(400).json({message: ["google_login_not_valid"]});
            return;
        }

        if (
            !(await this.usersService.checkExistGoogleEmail(
                infoUserGoogle.data
            ))
        ) {
            await this.usersService.registerGoogleAccount(infoUserGoogle.data);
        }

        let user: User = await this.usersService.findOne({
            where: {EMAIL: infoUserGoogle.data.email},
        });

        if (user == null) {
            response.status(400).json({message: ["google_login_not_valid"]});
            return;
        }

        const jwt = this.jwtService.sign({userId: user.ID});
        this.usersService.usersLoggedIn.set(user.ID, jwt);

        response.cookie("jwt", jwt, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        response.status(200).json({
            message: ["successfully_logged_in"],
            USERNAME: user.USERNAME,
        });
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 60)
    @ApiOkResponse()
    @Get("logout")
    @UseGuards(AuthenticatedGuard)
    async logout(
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        this.usersService.usersLoggedIn.delete(request.user.userId);
        response.clearCookie("jwt");
    }

    countFailAttempt(request: Request, email: string) {
        const userToCount = this.obtainIpWithEmail(
            request.headers["x-forwarded-for"].toString(),
            email
        );
        const userBlocked = this.usersService.usersBlocked.get(userToCount);
        if (userBlocked.attempts == 0) {
            let newUserBlocked: UserBlocked = {
                firstAttempt: new Date().getTime(),
                until: 0,
                attempts: 1,
            };
            this.usersService.usersBlocked.set(userToCount, newUserBlocked);
            return;
        }
        if (userBlocked.attempts == 1) {
            let newAttempts = 0;
            if (userBlocked.firstAttempt + 60000 > new Date().getTime()) {
                newAttempts = 2;
            }
            let newUserBlocked: UserBlocked = {
                firstAttempt: userBlocked.firstAttempt,
                until: 0,
                attempts: 2,
            };
            this.usersService.usersBlocked.set(userToCount, newUserBlocked);
            return;
        }
        if (userBlocked.attempts == 2) {
            let newUntil = 0;
            if (userBlocked.firstAttempt + 60000 > new Date().getTime()) {
                newUntil = new Date().getTime() + 120000;
            }
            let newUserBlocked: UserBlocked = {
                firstAttempt: 0,
                until: newUntil,
                attempts: 0,
            };
            this.usersService.usersBlocked.set(userToCount, newUserBlocked);
            return;
        }
    }

    verifyBlockUser(request: Request, email: string) {
        const userToCheck = this.obtainIpWithEmail(
            request.headers["x-forwarded-for"].toString(),
            email
        );
        if (!this.usersService.usersBlocked.get(userToCheck)) {
            let userBlocked: UserBlocked = {
                firstAttempt: 0,
                until: 0,
                attempts: 0,
            };
            this.usersService.usersBlocked.set(userToCheck, userBlocked);
        }
        const timeBanned = this.usersService.usersBlocked.get(userToCheck)
            .until;
        return timeBanned > new Date().getTime();
    }

    obtainSecondsBanned(request: Request, email: string): number {
        const userToCheck = this.obtainIpWithEmail(
            request.headers["x-forwarded-for"].toString(),
            email
        );
        const userBlocked = this.usersService.usersBlocked.get(userToCheck);
        const untilTimestamp = userBlocked.until;
        return Math.round((untilTimestamp - new Date().getTime()) / 1000);
    }

    obtainIpWithEmail(ip: string, email: string): string {
        let value = "{IP}[{EMAIL}]";
        return value.replace("{IP}", ip).replace("{EMAIL}", email);
    }
}
