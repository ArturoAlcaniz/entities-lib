import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ColumnNumericTransformer } from "../transformers/ColumnNumericTransformer";
import { User } from "./user.entity";
import { EntityWrapper} from "../transformers/EntityWrapper";

@Entity()
export class Code extends EntityWrapper {
    @PrimaryColumn()
    ID: string;

    @Column({type: "decimal", default: 0.00, nullable: false, precision: 9, scale: 2, transformer: new ColumnNumericTransformer()})
    COINS: number;

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