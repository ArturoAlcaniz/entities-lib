import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Invoice } from "./invoice.entity";
import { Product } from "./product.entity";



@Entity()
export class InvoiceItem extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Invoice, invoice => invoice.items)
    invoice: Invoice;

    @OneToOne(() => Product, { nullable: false })
    product: Product;

    @CreateDateColumn()
    createdAt: "string";

    @UpdateDateColumn()
    updatedAt: "string";
}
