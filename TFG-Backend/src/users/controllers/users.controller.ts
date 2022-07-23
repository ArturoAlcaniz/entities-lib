import {LoginDto} from "./../dtos/login.dto";
import {Body, Inject, Post, Req, Res, UseGuards, Controller, Get, UseInterceptors, UploadedFile, UploadedFiles, StreamableFile, Param} from "@nestjs/common";
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
import {ModifyUserDto} from "../dtos/modifyUser.dto";
import {SendCodeDto} from "../dtos/sendcode.dto";
import {MailerService} from "../../mailer/mailer.service";
import {v4 as uuidv4} from "uuid";
import {SendCodeLoginDto} from "../dtos/sendCodeLogin.dto";
import { CodeEmail } from "../types/code-email.type";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import { Multer } from 'multer';
import { createReadStream } from "fs";
import { join } from "path";
import fs from 'fs';
import {BuyCoinsDto} from "../dtos/buyCoins.dto";
import { PaymentsService } from "../services/payments.service";
import { Payment } from "../entities/payment.entity";
import { LimitedBy } from "../entities/code.entity";


@ApiTags("User Controller")
@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService,
        private paymentsService: PaymentsService,
        private jwtService: JwtService,
        private httpService: HttpService,
        private mailerService: MailerService,
        @Inject("winston")
        private readonly logger: Logger
    ) {}

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 3000)
    @ApiOkResponse()
    @Post("register")
    async createUserSendCode(
        @Body() payload: SendCodeDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
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

        let codeEmail: CodeEmail = this.createCodeEmail();

        await this.mailerService.sendCodeRegister(payload.email, codeEmail.code);

        this.usersService.usersRegistering.set(codeEmail.code, user)
        this.usersService.codesSent.set(payload.email, codeEmail);

        response.status(200).json({
            message: ["sent_code"],
        });

        this.logger.info(
            "Code sent to {EMAIL} {IP}"
                .replace("{IP}", request.headers["x-forwarded-for"].toString())
                .replace("{EMAIL}", payload.email)
        );
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 3000)
    @ApiOkResponse()
    @Post("register2")
    async createUser(
        @Body() payload: CreateUserDto,
        @Res({passthrough: true}) response: Response
    ) {
        if(!payload.code || !this.usersService.usersRegistering.get(payload.code)){
            response.status(400).json({message: ["code_invalid"]});
            return;
        }

        let user: User = this.usersService.usersRegistering.get(payload.code)

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

        if (payload.code != this.usersService.codesSent.get(user.EMAIL).code) {
            response.status(400).json({message: ["code_invalid"]});
            return;
        }

        if(!this.checkCodeEmail(this.usersService.codesSent.get(user.EMAIL))){
            response.status(400).json({message: ["code_expired"]});
            return;
        }

        this.usersService.save(user);
        this.usersService.usersRegistering.delete(payload.code);
        response.status(200).json({message: ["successfully_registered"]});
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 60)
    @ApiOkResponse()
    @Post("login2")
    async login2(
        @Body() payload: SendCodeLoginDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        const user = this.jwtService.decode(request.cookies["jwt"])["userId"];

        let u: User = await this.usersService.findOne({
            where: {ID: user},
        });

        if (
            request.cookies["jwt"] !=
            this.usersService.usersLoggedInUnconfirmed.get(user)
        ) {
            response.status(400).json({message: ["login_invalid"]});
            return;
        }

        if (
            !payload.code ||
            payload.code != this.usersService.codesSent.get(u.EMAIL).code
        ) {
            response.status(400).json({message: ["code_invalid"]});
            return;
        }

        if(!this.checkCodeEmail(this.usersService.codesSent.get(u.EMAIL))){
            response.status(400).json({message: ["code_expired"]});
            return;
        }

        this.usersService.usersLoggedIn.set(
            user,
            this.usersService.usersLoggedInUnconfirmed.get(user)
        );
        this.usersService.usersLoggedInUnconfirmed.delete(user);

        response.status(200).json({
            message: ["successfully_logged_in"],
            USERNAME: u.USERNAME,
            EMAIL: u.EMAIL,
            COINS: u.COINS,
            AVATAR: u.AVATAR,
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

        let codeEmail: CodeEmail = this.createCodeEmail();

        await this.mailerService.sendCodeLogin(payload.email, codeEmail.code);

        const jwt = this.jwtService.sign({userId: user.ID});
        this.usersService.usersLoggedInUnconfirmed.set(user.ID, jwt);
        this.usersService.codesSent.set(user.EMAIL, codeEmail);

        response.cookie("jwt", jwt, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        response.status(200).json({
            message: ["sent_code"],
        });

        this.logger.info(
            "Code sent to {EMAIL} {IP}"
                .replace("{IP}", request.headers["x-forwarded-for"].toString())
                .replace("{EMAIL}", payload.email)
        );
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 60)
    @UseGuards(AuthenticatedGuard)
    @ApiOkResponse()
    @Post("buyCoins")
    async buyCoins(
        @Body() payload: BuyCoinsDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        let user: User = await this.usersService.findOne({
            where: {
                ID: this.jwtService.decode(request.cookies["jwt"])["userId"],
            },
        });

        const headersRequest = {
            'Content-Type': 'application/json', // afaik this one is not needed
            'Authorization': `Basic ${Buffer.from(process.env.CLIENT_ID+":"+process.env.SECRET_ID).toString('base64')}`,
        };

        const infoPayment = await firstValueFrom(
            this.httpService.get(
                "https://www.sandbox.paypal.com/v2/checkout/orders/" +
                    payload.id + "?grant_type=client_credentials&ignoreCache=true",
                    { headers: headersRequest}
            )
        );

        if(infoPayment.data.status != "COMPLETED") {
            response.status(400).json({message: "Error buying coins"});
            return;
        }

        let payment: Payment = this.paymentsService.createPayment(payload.id, infoPayment.data.purchase_units[0].amount.value, user)
        
        if(!this.paymentsService.validatePayment(payment)) {
            response.status(400).json({message: "Payment already added"})
            return;
        }

        await this.paymentsService.save(payment)

        let coins = Number(payment.COINS.toString().slice(0, (payment.COINS.toString().indexOf(".")+3)))
        user.COINS = user.COINS + coins
        
        await this.usersService.save(user)
        
        response.status(200).json({
            message: ["successfully_payment"],
            COINS: user.COINS
        });

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
            EMAIL: user.EMAIL,
            COINS: user.COINS,
            AVATAR: user.AVATAR,
        });
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 3000)
    @ApiOkResponse()
    @Post("modify")
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(
	    FileInterceptor('avatar')
    )
    async modifyUser(
        @Body() payload: ModifyUserDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request,
        @UploadedFile() avatar: Express.Multer.File
    ) {
        let user: User = await this.usersService.findOne({
            where: {
                ID: this.jwtService.decode(request.cookies["jwt"])["userId"],
            },
        });

        if (
            user == null ||
            (user.PASSWORD == null && payload.pass != "") ||
            (user.PASSWORD != null &&
                !this.usersService.verifyPass(user, payload.pass))
        ) {
            response.status(400).json({
                message: ["invalid_credentials"],
                formError: "actualPassword",
            });
            this.logger.info(
                "Fail Update User (invalid_credentials) {IP}".replace(
                    "{IP}",
                    request.headers["x-forwarded-for"].toString()
                )
            );
            return;
        }

        if (
            payload.username != user.USERNAME &&
            !(await this.usersService.validateUniqueUsernameWithUsername(payload.username))
        ) {
            response
                .status(400)
                .json({
                    message: ["username_already_exist"],
                    formError: "username",
                });
            this.logger.info(
                "Fail Update User (username_already_exist) {IP}".replace(
                    "{IP}",
                    request.headers["x-forwarded-for"].toString()
                )
            );
            return;
        }

        if (
            payload.email != user.EMAIL &&
            !(await this.usersService.validateUniqueEmailWithEmail(payload.email))
        ) {
            response
                .status(400)
                .json({message: ["email_already_exist"], formError: "email"});
            this.logger.info(
                "Fail Update User (email_already_exist) {IP}".replace(
                    "{IP}",
                    request.headers["x-forwarded-for"].toString()
                )
            );
            return;
        }

        this.usersService.updateUser(user, payload);
        user.AVATAR = avatar.filename;
        this.usersService.save(user);
        response.status(200).json({message: ["successfully_updated"], AVATAR: user.AVATAR});
        this.logger.info(
            "Update User Sucessfully {IP} {FILE}".replace(
                "{IP}",
                request.headers["x-forwarded-for"].toString()
            ).replace(
                "{FILE}",
                avatar.filename
            )
        );

        await this.mailerService.sendDataChangedConfirm(user.EMAIL)
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(20, 3000)
    @ApiOkResponse()
    @Get("avatar/:avatar")
    @UseGuards(AuthenticatedGuard)
    async getAvatar(
        @Param('avatar') avatar: string,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request,
    ) {

        let file = "files/{FILENAME}".replace(
            "{FILENAME}",
            avatar
        )
        if (fs.existsSync(file)) {
            const f = createReadStream(join(process.cwd(), file));
            return new StreamableFile(f);
        }
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(20, 3000)
    @ApiOkResponse()
    @Get("avatar")
    @UseGuards(AuthenticatedGuard)
    async getAvatarDefault(
        @Res({passthrough: true}) response: Response,
        @Req() request: Request,
    ) {
        let file = "static-images/UserProfile.png"
        const f = createReadStream(join(process.cwd(), file));
        return new StreamableFile(f); 
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(10, 3000)
    @ApiOkResponse()
    @Post("modifyWithoutAvatar")
    @UseGuards(AuthenticatedGuard)
    async modifyUserWithoutAvatar(
        @Body() payload: ModifyUserDto,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request,
    ) {
        let user: User = await this.usersService.findOne({
            where: {
                ID: this.jwtService.decode(request.cookies["jwt"])["userId"],
            },
        });

        if (
            user == null ||
            (user.PASSWORD == null && payload.pass != "") ||
            (user.PASSWORD != null &&
                !this.usersService.verifyPass(user, payload.pass))
        ) {
            response.status(400).json({
                message: ["invalid_credentials"],
                formError: "actualPassword",
            });
            this.logger.info(
                "Fail Update User (invalid_credentials) {IP}".replace(
                    "{IP}",
                    request.headers["x-forwarded-for"].toString()
                )
            );
            return;
        }

        if (
            payload.username != user.USERNAME &&
            !(await this.usersService.validateUniqueUsernameWithUsername(payload.username))
        ) {
            response
                .status(400)
                .json({
                    message: ["username_already_exist"],
                    formError: "username",
                });
            this.logger.info(
                "Fail Update User (username_already_exist) {IP}".replace(
                    "{IP}",
                    request.headers["x-forwarded-for"].toString()
                )
            );
            return;
        }

        if (
            payload.email != user.EMAIL &&
            !(await this.usersService.validateUniqueEmailWithEmail(payload.email))
        ) {
            response
                .status(400)
                .json({message: ["email_already_exist"], formError: "email"});
            this.logger.info(
                "Fail Update User (email_already_exist) {IP}".replace(
                    "{IP}",
                    request.headers["x-forwarded-for"].toString()
                )
            );
            return;
        }

        this.usersService.updateUser(user, payload)
        this.usersService.save(user);
        response.status(200).json({message: ["successfully_updated"], AVATAR: user.AVATAR});
        this.logger.info(
            "Update User Sucessfully {IP} {FILE}".replace(
                "{IP}",
                request.headers["x-forwarded-for"].toString()
            )
        );
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

    @UseGuards(ThrottlerGuard)
    @Throttle(100, 3000)
    @ApiOkResponse()
    @Get("obtainLimitedBy")
    async getCategories() {
        return Object.values(LimitedBy)
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
                attempts: newAttempts,
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

    createCodeEmail() {
        let code: CodeEmail = {
            code: uuidv4(),
            expiration: new Date().getTime()+3600000 //1h expiration
        }

        return code;
    }

    checkCodeEmail(code: CodeEmail) {
        return new Date().getTime()<=code.expiration 
    }
}
