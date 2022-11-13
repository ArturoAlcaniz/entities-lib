import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCodeTokenDto {
    @IsNotEmpty()
    readonly id: string;

    @IsNotEmpty()
    @IsDecimal()
    readonly coins: string;

    @IsString()
    readonly starts: string;

    @IsString()
    readonly ends: string;

    @IsNumber()
    readonly amount: string;
}