import {
    IsNotEmpty
} from "class-validator";

export class DeleteCodeTokenDto {
    @IsNotEmpty()
    readonly id: string;
}
