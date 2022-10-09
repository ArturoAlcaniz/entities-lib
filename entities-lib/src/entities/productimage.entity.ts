import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImage extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column({type: "varchar", length: 50})
    NAME: string;
    
    @ManyToOne(type => Product, product => product.IMAGES, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
        cascade: true,
    })
    PRODUCT: Product;
}