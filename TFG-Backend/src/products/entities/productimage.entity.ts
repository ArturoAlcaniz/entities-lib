import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Double,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImage extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column({type: "varchar", length: 50})
    NAME: string;
    
    @ManyToOne(type => Product, product => product.IMAGES)
    PRODUCT: Product;
}