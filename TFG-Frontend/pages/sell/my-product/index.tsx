import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import HeaderLogged from '@components/Commons/HeaderLogged';
import CustomErrorMessage from '@root/utils/CustomErrorMessage';
import { handleCreateProduct, handleDeleteProduct, handleModifyProduct, handleObtainMyProduct, uploadImageProduct } from '@root/components/Market/MarketLogic';
import Link from 'next/link';
import cookies from 'next-cookies';

export default class ModifyProductPage extends CustomBasicPage{

    static async getInitialProps(ctx: any) {
        return {
            pathname: ctx.pathname,
            initialLanguageSelected: cookies(ctx).languageSelected || 'english',
            username: cookies(ctx).username,
            email: cookies(ctx).email,
            avatar: cookies(ctx).avatar,
            idProduct: ctx.query.product,
        }
    }


    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            formError: "",
            componentName: "Modify Product | TI-Shop",
            id: props.idProduct,
            productname: "",
            startsell: "",
            endsell: "",
            category: "",
            description: "",
            price: 0.0,
            images: [],
            product: null,
        }

        try {
            handleObtainMyProduct(this);
        } catch(err) {}
    }

    obtainFields() {
        return `createProducts  ${this.state.product==null ? 'hidden' : ''}`
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { formError, productname, category, description, price, startsell, endsell } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('modifyProductError')]

        return (
            <div>
                {super.render()}
                <HeaderLogged username={this.props.username}
                        email={this.props.email}
                        avatar={this.props.avatar} 
                        pathname={this.props.pathname} 
                        setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} />
                <div className='buttonGoMyProducts'>
                    <Link href="/sell/my-products">
                        <button className="button is-primary">{obtainTextTranslated["buttons"]["my_products"]}</button>
                    </Link>
                </div>
                
                <div className={this.obtainFields()}>
                    <form onSubmit={handleModifyProduct.bind(this)}>
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
                                        {obtainTextTranslated["labels"]["start_sell"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" v-model={startsell} type="datetime-local" autoComplete="off"></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["end_sell"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" v-model={endsell} type="datetime-local" autoComplete="off"></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_price"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" v-model={price} type="number" autoComplete="off"></input>
                                    </div>
                                    { (formError=='price' || formError=='product') && CustomErrorMessage(msgError) }
                                </div>
                                <p className="help form-feedback-ok">
                                    {obtainTextTranslated["requestOK"][this.state.requestOK.get('modifyProductOk')]}
                                </p>
                                <div className="field">
                                    <p className="control">
                                        <button className="button">
                                            {obtainTextTranslated["buttons"]["modify_product"]}
                                        </button>

                                        <div className="deleteProduct" onClick={() => handleDeleteProduct(this)}>
                                            {obtainTextTranslated["buttons"]["delete_product"]}
                                        </div>
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