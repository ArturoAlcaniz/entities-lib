import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColumnNumericTransformer } from "../../commons/ColumnNumericTransformer";
import { User } from "./user.entity";

export enum LimitedBy {
    DATE = "Date",
    QUANTITY = "Quantity",
    DATE_QUANTITY = "Date and quantity",
    UNLIMITED = "Unlimited"
}

@Entity()
export class Code extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column({type: "decimal", default: 0.00, nullable: false, precision: 9, scale: 2, transformer: new ColumnNumericTransformer()})
    COINS: number;

    @Column({type: "enum", enum: LimitedBy, nullable: false})
    LIMITEDBY: LimitedBy;

    @Column({type: "datetime", nullable: true, default: null})
    STARTS: string;

    @Column({type: "datetime", nullable: true, default: null})
    ENDS: string;

    @Column({type: "int", nullable: true, default: null})
    AMOUNT: number;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[]; 
}