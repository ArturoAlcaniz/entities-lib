import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import HeaderLogged from '@components/Commons/HeaderLogged';
import CustomErrorMessage from '@root/utils/CustomErrorMessage';
import { handleCreateProduct, handleGoProduct, handleObtainMyProducts, uploadImageProduct } from '@root/components/Market/MarketLogic';
import cookies from 'next-cookies';
import Image from 'next/image'

export default class MyProductsPage extends CustomBasicPage{
    static async getInitialProps(ctx: any) {
        return {
            pathname: ctx.pathname,
            initialLanguageSelected: cookies(ctx).languageSelected || 'english',
            username: cookies(ctx).username,
            email: cookies(ctx).email,
            avatar: cookies(ctx).avatar
        }
    }

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

        try {
            handleObtainMyProducts(this);
          } catch(err) {}
    }

    render() {

        let languageSelected = this.state.languageSelected
        const { formError, productname, category, description, price } = this.state

        return (
            <div>
                {super.render()}
                <HeaderLogged username={this.props.username}
                        email={this.props.email}
                        coins={this.props.coins}
                        avatar={this.props.avatar} 
                        pathname={this.props.pathname} 
                        setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} />
                <div className="pageCentered">
                    <ul className="ListProducts">
                        {this.state.myProducts && this.state.myProducts.length>0 && this.state.myProducts.map(product => {
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