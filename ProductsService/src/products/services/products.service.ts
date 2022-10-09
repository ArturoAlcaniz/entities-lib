import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "../../commons/service.commons";
import { User } from "entities-lib/src/entities/user.entity";
import { Category, Product } from "entities-lib/src/entities/product.entity";

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

    createProduct(name: string, description: string, category: string, start: string, end: string, price: string, user: User): Product {
        let product = new Product()
        product.PRODUCTNAME = name;
        product.DESCRIPTION = description;
        product.CATEGORY = <Category> category;
        product.STARTS = start;
        product.ENDS = end;
        product.PRICE = price;
        product.USER = user;
        product.BUYER = null;
        return product;
    }

}