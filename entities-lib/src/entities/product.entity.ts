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

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column({type: "varchar", length: 50})
    PRODUCTNAME: string;

    @Column({type: "enum", enum: Category, nullable: false})
    CATEGORY: Category;

    @Column({type: "varchar", nullable: false, length: 100})
    DESCRIPTION: string;

    @Column({type: "datetime", nullable: true, default: null})
    STARTS: string;

    @Column({type: "datetime", nullable: true, default: null})
    ENDS: string;

    @Column({type: "decimal", nullable: false, precision: 5, scale: 2})
    PRICE: string;

    @ManyToOne(type => User, user => user.PRODUCTS)
    USER: User;

    @OneToMany(type => ProductImage, productImage => productImage.PRODUCT)
    IMAGES: ProductImage[];

    @CreateDateColumn()
    CREATED_AT: "string";

    @UpdateDateColumn()
    UPDATED_AT: "string";
}