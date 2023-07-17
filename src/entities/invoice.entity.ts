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
import { InvoiceItem } from "./invoiceItem.entity";



@Entity()
export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => User, user => user.invoices)
    buyer: User;

    @OneToMany(type => InvoiceItem, invoiceItem => invoiceItem.invoice, { cascade: true })
    items: InvoiceItem[];

    @Column({type: "decimal", nullable: false, precision: 5, scale: 2})
    price: string;

    @CreateDateColumn()
    created_at: "string";

    @UpdateDateColumn()
    updated_at: "string";
}
