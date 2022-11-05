import React from 'react'
import HeaderLogged from '@components/Commons/HeaderLogged';
import { handleGoProduct, handleObtainMyProducts, uploadImageProduct } from '@root/components/Market/MarketLogic';
import Image from 'next/image'
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';

export default class MyProductsPage extends CustomBasicPageLogged{

    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            formError: "",
            componentName: "My Products | TI-Shop",
            productname: "",
            category: "",
            description: "",
            price: 0.0,
            images: [],
            myProducts: []
        }

        handleObtainMyProducts(this).catch(e => console.log("Failed to get products", e));
    }

    render() {

        let languageSelected = this.state.languageSelected
        const { formError, productname, category, description, price } = this.state

        return (
            <div>
                {super.render()}
                <div className="pageCentered">
                    <ul className="ListProducts">
                        {this.state.myProducts && this.state.myProducts.length>0 && this.state.myProducts.map(product => {
                            return (
                                <li key={product.ID}>
                                    <div className="box clickable" onClick={() => handleGoProduct(product.ID)}>
                                        <div className="content">
                                            <>
                                                <Image src={product.IMAGES[0] ? `/api/products/image/${product.IMAGES[0].NAME}` : `/api/products/image`} width={300} height={200} alt="Product Image"/>
                                            </>
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