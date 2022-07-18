import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import { handleObtainAllProducts } from '@root/components/Market/MarketLogic';
import cookies from 'next-cookies';
import Image from 'next/image'
import Router from 'next/router';
import Header from '@root/components/Commons/Header';

export default class AllProductsPage extends CustomBasicPage{
    static async getInitialProps(ctx: any) {
        return {
            ...this.getInitialProps,
            pathname: ctx.pathname,
            initialLanguageSelected: cookies(ctx).languageSelected || 'english',
        }
    }

    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            formError: "",
            componentName: "Products | TI-Shop",
            products: []
        }

        try {
            handleObtainAllProducts(this);
          } catch(err) {}
    }

    render() {

        let languageSelected = this.state.languageSelected
        const { formError, productname, category, description, price } = this.state

        return (
            <div>
                {super.render()}
                <Header setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} 
                        pathname={this.props.pathname} />
                <div className="pageCentered">
                    <ul className="ListProducts">
                        {this.state.products && this.state.products.length>0 && this.state.products.map(product => {
                            return (
                                <li key={product.ID}>
                                    <div className="box clickable" onClick={() => {Router.push('login')}}>
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