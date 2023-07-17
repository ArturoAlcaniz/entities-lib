import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { ProductImage } from "./productimage.entity";
import { Category } from "./categoryProduct.enum";
import { InvoiceItem } from "./invoiceItem.entity";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", length: 50})
    productName: string;

    @Column({type: "enum", enum: Category, nullable: false})
    category: Category;

    @Column({type: "varchar", nullable: false, length: 100})
    description: string;

    @Column({type: "datetime", nullable: true, default: null})
    starts: string;

    @Column({type: "datetime", nullable: true, default: null})
    ends: string;

    @Column({type: "decimal", nullable: false, precision: 5, scale: 2})
    price: string;

    @ManyToOne(type => User, user => user.products)
    user: User;

    @OneToMany(type => ProductImage, productImage => productImage.product, { cascade: true })
    images: ProductImage[];

    @OneToOne(() => InvoiceItem, { nullable: true, cascade: true })
    @JoinColumn()
    sold: InvoiceItem;

    @CreateDateColumn()
    createdAt: "string";

    @UpdateDateColumn()
    updatedAt: "string";
}
