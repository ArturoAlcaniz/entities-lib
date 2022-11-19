import React from 'react'
import CustomErrorMessage from '@root/utils/CustomErrorMessage';
import { handleCreateProduct, handleObtainCategories, uploadImageProduct, handleChangeProductName, handleChangeCategory, handleChangeDescription,
    handleChangeStartSell, handleChangeEndsell, handleChangePrice } from '@root/components/Market/MarketLogic';
import Link from 'next/link';
import shortid from 'shortid';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';

export default class SellPage extends CustomBasicPageLogged{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            formError: "",
            componentName: "Create Product | TI-Shop",
            productname: "",
            startsell: "",
            endsell: "",
            category: "",
            description: "",
            price: 0.0,
            images: [],
            productCategories: [],
        }

        try {
            handleObtainCategories(this)
        } catch {

        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { formError, productname, category, description, price, startsell, endsell } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('createProductError')]

        return (
            <div>
                {super.render()}
                <div className='buttonGoMyProducts'>
                    <Link href="/sell">
                        <button className="button is-primary">{obtainTextTranslated["buttons"]["my_products"]}</button>
                    </Link>
                </div>
                
                <div className="createProducts">
                    <form onSubmit={handleCreateProduct.bind(this)}>
                        <div className="card createProductForm">
                            <div className="card-content">
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_name"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={productname} onChange={handleChangeProductName.bind(this)} type="text" autoComplete="off"></input>
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
                                        <select className="select" value={category} onChange={handleChangeCategory.bind(this)} autoComplete="off">
                                        {this.state.productCategories && this.state.productCategories.length>0 && this.state.productCategories.map(category => {
                                            return (
                                                <option key={shortid.generate()} value={category}>{category}</option>
                                                );
                                            })
                                        }
                                        </select>
                                    </div>
                                    { formError=='category' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_description"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={description} onChange={handleChangeDescription.bind(this)} type="text" autoComplete="off"></input>
                                    </div>
                                    { formError=='description' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["start_sell"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={startsell} onChange={handleChangeStartSell.bind(this)} type="datetime-local" autoComplete="off"></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["end_sell"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={endsell} onChange={handleChangeEndsell.bind(this)} type="datetime-local" autoComplete="off"></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["product_price"]}
                                    </label>
                                    <div className="control">
                                        <input className="input" value={price} onChange={handleChangePrice.bind(this)} type="number" autoComplete="off"></input>
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