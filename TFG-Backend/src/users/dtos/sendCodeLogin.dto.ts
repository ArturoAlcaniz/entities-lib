import {IsNotEmpty, IsString, IsEmail} from "class-validator";

export class SendCodeLoginDto {
    @IsNotEmpty({message: "email_empty"})
    @IsString()
    @IsEmail({}, {message: "invalid_email"})
    readonly email: string;

    @IsNotEmpty({message: "code_empty"})
    @IsString()
    readonly code: string;
}
