import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import HeaderLogged from '@components/Commons/HeaderLogged';
import CustomErrorMessage from '@root/utils/CustomErrorMessage';
import { handleCreateProduct } from '@root/components/Market/MarketLogic';

export default class CreateProductPage extends CustomBasicPage{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            formError: "",
            componentName: "Create Product | TI-Shop",
            productname: "",
            category: "",
            description: "",
            price: 0.0,
        }
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