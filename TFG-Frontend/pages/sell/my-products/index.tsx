import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import HeaderLogged from '@components/Commons/HeaderLogged';
import CustomErrorMessage from '@root/utils/CustomErrorMessage';
import { handleCreateProduct, handleObtainMyProducts, uploadImageProduct } from '@root/components/Market/MarketLogic';
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
        
    }

    async componentDidMount() {
        try {
            await handleObtainMyProducts(this);
          } catch(err) {}
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        
        const { formError, productname, category, description, price } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('createProductError')]

        return (
            <div>
                {super.render()}
                <HeaderLogged username={this.props.username}
                        email={this.props.email}
                        avatar={this.props.avatar} 
                        pathname={this.props.pathname} 
                        setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} />
                <div className="pageCentered">
                    <ul className="ListProducts">
                        {this.state.myProducts && this.state.myProducts.length>0 && this.state.myProducts.map(product => {
                            return (
                                <li key={product.ID}>
                                    <div className="box">
                                        <div className="content">
                                            <div>
                                                <Image src={`/api/products/image/${product.IMAGES[0].NAME}`} width={300} height={200} alt="Product Image"/>
                                            </div>
                                            <p>
                                                <strong>{product.PRODUCTNAME}</strong><br></br>
                                                {product.DESCRIPTION}
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