import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ColumnNumericTransformer } from "../transformers/ColumnNumericTransformer";
import { Product } from "./product.entity";
import { Payment } from "./payment.entity";
import { Invoice } from "./invoice.entity";
import { Rol } from './rolUser.enum';

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", length: 50, unique: true})
    userName: string;

    @Column({type: "varchar", default: "", nullable: false, length: 50})
    avatar: string;

    @Column({type: "varchar", nullable: false, length: 50, unique: true})
    email: string;

    @Column({type: "enum", enum: Rol, default: Rol.USER, nullable: false})
    rol: Rol;

    @Column({type: "varchar", nullable: true, default: null, length: 300})
    password: string;

    @Column({type: "decimal", default: 0.00, nullable: false, precision: 9, scale: 2, transformer: new ColumnNumericTransformer()})
    coins: number;

    @OneToMany(type => Product, product => product.user, { cascade: true })
    products: Product[];

    @OneToMany(type => Invoice, invoice => invoice.buyer, { cascade: true })
    invoices: Invoice[];

    @CreateDateColumn()
    createdAt: "string";

    @UpdateDateColumn()
    updatedAt: "string";

    @OneToMany(type => Payment, payment => payment.user, { cascade: true })
    payments: Payment[];
}

export {User}