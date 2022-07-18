import React from 'react'
import Image from 'next/image'
import { handleObtainAllProducts, handleGoProduct } from '@root/components/Market/MarketLogic';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';

export default class BuyPage extends CustomBasicPageLogged{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            componentName: "Buy | TI-Shop",
            products: [],
        }

        try {
            handleObtainAllProducts(this);
        } catch(err) {}
    }

    render() {

        let languageSelected = this.state.languageSelected

        return (
            <div>
                {super.render()}
                <div className="pageCentered">
                <ul className="ListProducts">
                        {this.state.products && this.state.products.length>0 && this.state.products.map(product => {
                            return (
                                <li key={product.ID}>
                                    <div className="box clickable" onClick={() => handleGoProduct(product.ID)}>
                                        <div className="content">
                                            <div>
                                                <Image src={product.IMAGES[0] ? `/api/products/image/${product.IMAGES[0].NAME}` : `/api/products/image`} width={300} height={200} alt="Product Image"/>
                                            </div>
                                            <p>
                                                <strong>{product.PRODUCTNAME}</strong><br></br>
                                                <div className="productPrice">
                                                    {product.PRICE}
                                                </div>
                                                <div className="productCoin">
                                                    {' Coins'}
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}