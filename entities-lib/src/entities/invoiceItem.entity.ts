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
import { Invoice } from "./invoice.entity";



@Entity()
export class InvoiceItem extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Invoice, invoice => invoice.items)
    invoice: Invoice;

    @Column({type: "varchar", length: 50})
    productName: string;

    @Column({type: "enum", enum: Category, nullable: false})
    category: Category;

    @Column({type: "varchar", nullable: false, length: 100})
    description: string;

    @Column({type: "decimal", nullable: false, precision: 5, scale: 2})
    price: string;

    @ManyToOne(type => User, user => user.productsSold)
    seller: User;

    @OneToMany(type => ProductImage, productImage => productImage.product)
    images: ProductImage[];

    @CreateDateColumn()
    createdAt: "string";

    @UpdateDateColumn()
    updatedAt: "string";
}
