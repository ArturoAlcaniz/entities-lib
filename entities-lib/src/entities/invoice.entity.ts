import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { ProductImage } from "./productimage.entity";
import { Category } from "./categoryProduct.enum";
import { InvoiceItem } from "./invoiceItem.entity";



@Entity()
export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @ManyToOne(type => User, user => user.INVOICES)
    BUYER: User;

    @OneToMany(type => InvoiceItem, invoiceItem => invoiceItem.INVOICE)
    ITEMS: InvoiceItem[];

    @Column({type: "decimal", nullable: false, precision: 5, scale: 2})
    PRICE: string;

    @CreateDateColumn()
    CREATED_AT: "string";

    @UpdateDateColumn()
    UPDATED_AT: "string";
}
