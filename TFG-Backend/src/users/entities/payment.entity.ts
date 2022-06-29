import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    UpdateDateColumn,
    PrimaryColumn,
} from "typeorm";
import { ColumnNumericTransformer } from "../../commons/ColumnNumericTransformer";
import { User } from "./user.entity";

@Entity()
export class Payment extends BaseEntity {

    @PrimaryColumn()
    ID: string;

    @Column({type: "decimal", default: 0.00, nullable: false, precision: 9, scale: 2, transformer: new ColumnNumericTransformer()})
    COINS: number;

    @ManyToOne(type => User, user => user.PAYMENTS)
    USER: User;

    @CreateDateColumn()
    CREATED_AT: "string";

    @UpdateDateColumn()
    UPDATED_AT: "string";
}
