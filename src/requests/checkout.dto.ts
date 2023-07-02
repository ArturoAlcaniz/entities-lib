import { IsNotEmpty } from "class-validator";

export class CheckoutDto {
    @IsNotEmpty({message: "products_empty"})
    readonly products: string[];
}