import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class ModifyUserDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly newPass: string;

    @IsString()
    readonly pass: string;
}
