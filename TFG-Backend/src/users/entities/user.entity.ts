import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column({type: "varchar", length: 50, unique: true})
    USERNAME: string;

    @Column({type: "varchar", default: "", nullable: false, length: 50})
    AVATAR: string;

    @Column({type: "varchar", nullable: false, length: 50, unique: true})
    EMAIL: string;

    @Column({type: "varchar", default: "User", nullable: false, length: 10})
    ROL: string;

    @Column({type: "varchar", nullable: true, default: null, length: 100})
    PASSWORD: string;

    @OneToMany(type => Product, product => product.USER)
    PRODUCTS: Product[];

    @CreateDateColumn()
    CREATED_AT: "string";

    @UpdateDateColumn()
    UPDATED_AT: "string";
}
