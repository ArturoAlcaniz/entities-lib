import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ColumnNumericTransformer } from "../transformers/ColumnNumericTransformer";
import { User } from "./user.entity";
import { EntityWrapper} from "../transformers/EntityWrapper";

@Entity()
export class Code extends EntityWrapper {
    @PrimaryColumn()
    id: string;

    @Column({type: "decimal", default: 0.00, nullable: false, precision: 9, scale: 2, transformer: new ColumnNumericTransformer()})
    coins: number;

    @Column({type: "datetime", nullable: true, default: null})
    starts: Date;

    @Column({type: "datetime", nullable: true, default: null})
    ends: Date;

    @Column({type: "int", nullable: true, default: null})
    amount: number;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[]; 
}