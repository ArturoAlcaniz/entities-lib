import {IsNotEmpty, IsString, IsEmail} from "class-validator";

export class DeleteUserDto {
    @IsNotEmpty({message: "id_empty"})
    @IsString()
    readonly id: string;
}