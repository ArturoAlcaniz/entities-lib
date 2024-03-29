import {IsNotEmpty, IsString, IsEmail, IsNumber, IsDecimal} from "class-validator";

export class CreateUserManagementDto {
    @IsNotEmpty({message: "email_empty"})
    @IsString()
    @IsEmail({}, {message: "invalid_email"})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly pass: string;

    @IsNotEmpty()
    @IsString()
    readonly rol: string;

    @IsNotEmpty()
    readonly coins: string;
}
