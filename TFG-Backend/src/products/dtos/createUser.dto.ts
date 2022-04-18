import {IsDecimal, IsNotEmpty, IsString} from "class-validator";
import { Double } from "typeorm";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    readonly productname: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly category: string;

    @IsNotEmpty()
    @IsDecimal()
    readonly price: Double;
}
