import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    UpdateDateColumn,
    PrimaryColumn,
} from "typeorm";
import { ColumnNumericTransformer } from "../transformers/ColumnNumericTransformer";
import { User } from "./user.entity";

@Entity()
export class Payment extends BaseEntity {

    @PrimaryColumn()
    id: string;

    @Column({type: "decimal", default: 0.00, nullable: false, precision: 9, scale: 2, transformer: new ColumnNumericTransformer()})
    coins: number;

    @ManyToOne(type => User, user => user.payments)
    user: User;

    @CreateDateColumn()
    createdAt: "string";

    @UpdateDateColumn()
    updatedAt: "string";
}
