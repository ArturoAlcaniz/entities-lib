import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Double, Repository } from "typeorm";
import { BaseService } from "../../commons/service.commons";
import { User } from "../../users/entities/user.entity";
import { Product } from "../entities/product.entity";
import { ProductImage } from "../entities/productimage.entity";

@Injectable()
export class ProductsService extends BaseService<Product> {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ){
        super();
    }

    getRepository(): Repository<Product> {
        return this.productRepository;
    }

    createProduct(name: string, description: string, category: string, start: string, end: string, price: Double, user: User): Product {
        let product = new Product()
        product.PRODUCTNAME = name;
        product.DESCRIPTION = description;
        product.CATEGORY = category;
        product.STARTS = start;
        product.ENDS = end;
        product.PRICE = price;
        product.USER = user;
        return product;
    }

}