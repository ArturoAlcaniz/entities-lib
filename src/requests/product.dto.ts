import {
    IsNotEmpty
} from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    readonly id: string;
}
