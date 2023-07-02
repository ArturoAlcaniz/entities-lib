import {
    IsNotEmpty
} from "class-validator";

export class RedeemCodeTokenDto {
    @IsNotEmpty()
    readonly id: string;
}
