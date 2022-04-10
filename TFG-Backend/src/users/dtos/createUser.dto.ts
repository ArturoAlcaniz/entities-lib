import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly pass: string;

    @IsNotEmpty()
    @IsString()
    readonly code: string;
}
