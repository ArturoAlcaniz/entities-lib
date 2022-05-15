import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import HeaderLogged from '@components/Commons/HeaderLogged';
import CustomErrorMessage from '@root/utils/CustomErrorMessage';
import { handleCreateProduct, handleObtainMyProducts, uploadImageProduct } from '@root/components/Market/MarketLogic';
import cookies from 'next-cookies';

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
                    <select>
                        {this.state.myProducts && this.state.myProducts.length>0 && this.state.myProducts.map(product => {
                            return (<option key={product.ID} value={product.ID}>{product.PRODUCTNAME}</option>);
                        })}
                    </select>
                    <form onSubmit={handleCreateProduct.bind(this)}>
                        <div className="card createProductForm">
                            <div className="card-content">
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_name"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" v-model={productname} type="text" autoComplete="off"></input>
                                    </div>
                                    { formError=='name' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["productimage"]}
                                    </label>
                                    <div className="control">
                                        <input type="file" multiple={true} name="images" onChange={uploadImageProduct.bind(this)} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_category"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" v-model={category} type="text" autoComplete="off"></input>
                                    </div>
                                    { formError=='category' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_description"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" v-model={description} type="text" autoComplete="off"></input>
                                    </div>
                                    { formError=='description' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_price"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" v-model={price} type="number" autoComplete="off"></input>
                                    </div>
                                    { formError=='price' && CustomErrorMessage(msgError) }
                                </div>
                                <p className="help form-feedback-ok">
                                    {obtainTextTranslated["requestOK"][this.state.requestOK.get('createProductOk')]}
                                </p>
                                <div className="field">
                                    <p className="control">
                                        <button className="button">
                                            {obtainTextTranslated["buttons"]["add_product"]}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}