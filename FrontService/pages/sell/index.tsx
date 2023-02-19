import React from 'react'
import { handleGoProduct, handleObtainMyProducts } from '@root/components/Market/MarketLogic';
import Image from 'next/image'
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import Link from 'next/link';

export default class MyProductsPage extends CustomBasicPageLogged{

    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            formError: "",
            componentName: "My Products | TI-Shop",
            myProducts: []
        }

        handleObtainMyProducts(this).catch(e => console.log("Failed to get products", e));
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        
        return (
            <div>
                {super.render()}
                <div className='buttonCentered'>
                    <Link href="/sell/create">
                        <button className="button is-primary">{obtainTextTranslated["buttons"]["add_product"]}</button>
                    </Link>
                </div>
                <div className="pageCentered">
                    <ul className="ListProducts">
                        {this.state.myProducts && this.state.myProducts.length>0 && this.state.myProducts.map(product => {
                            return (
                                <li key={product.ID}>
                                    <div className="box clickable" onClick={() => handleGoProduct(product.ID)}>
                                        <div className="content">
                                            <>
                                                <Image 
                                                    src={product.IMAGES[0] ? `/api/products/image/${product.IMAGES[0].NAME}` : `/api/products/image`} 
                                                    alt="Product Image"
                                                    width={300}
                                                    height={200}
                                                    style={{ width: '300px', height: '200px' }} 
                                                />
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