import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "../../commons/service.commons";
import { Product } from "../entities/product.entity";
import { ProductImage } from "../entities/productimage.entity";

@Injectable()
export class ProductImagesService extends BaseService<ProductImage> {
    constructor(
        @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>
    ){
        super();
    }

    getRepository(): Repository<ProductImage> {
        return this.productImageRepository;
    }

    createProductImage(name: string, product: Product): ProductImage {
        let productImage = new ProductImage()
        productImage.PRODUCT = product
        productImage.NAME = name
        return productImage;
    }
}