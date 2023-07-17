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
    id: string;

    @Column({type: "varchar", length: 50})
    name: string;
    
    @ManyToOne(type => Product, product => product.images, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT"
    })
    product: Product;
}