import React from 'react'
import CustomErrorMessage from '@root/utils/CustomErrorMessage';
import { handleChangeCategory, handleChangeDescription, handleChangeEndsell, handleChangePrice, handleChangeProductName, handleChangeStartSell, handleDeleteProduct, handleModifyProduct, handleObtainCategories, handleObtainMyProduct, uploadImageProduct } from '@root/components/Market/MarketLogic';
import Link from 'next/link';
import cookies from 'next-cookies';
import Image from 'next/image'
import shortid from 'shortid';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';

export default class ModifyProductPage extends CustomBasicPageLogged{

    static async getInitialProps(ctx: any) {
        return {
            ...this.getInitialProps,
            coins: cookies(ctx).coins,
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
            imagesAlreadyAdded: [],
            images: [],
            product: null,
            productCategories: [],
        }

        try {
            handleObtainCategories(this);
            handleObtainMyProduct(this);
        } catch(err) {}
    }

    obtainFields() {
        return `createProducts  ${this.state.product==null ? 'hidden' : ''}`
    }

    deleteImageAlreadyAdded(image){
        let images: [] = this.state.imagesAlreadyAdded
        
        function equalToImage(element) {
            return element === image
        }

        let index: number = images.findIndex(equalToImage)

        if(index != -1) {
            images.splice(index, 1)
        }
        this.setState({imagesAlreadyAdded: images})
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { formError, productname, category, description, price, startsell, endsell } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('modifyProductError')]

        return (
            <div>
                {super.render()}
                <div className='buttonCentered'>
                    <Link href="/sell">
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
                                    <div className="media-scroller snaps-inline">
                                        { this.state.imagesAlreadyAdded && this.state.imagesAlreadyAdded.length>0 && this.state.imagesAlreadyAdded.map(image => {
                                            return (
                                                <div key={image.ID} className="media-element">
                                                    <i onClick={() => {this.deleteImageAlreadyAdded(image)}} className="gg-trash"></i>
                                                    <Image src={`/api/products/image/${image.NAME}`} max-width={300} max-heigh={200} width={300} height={200} alt="Product Image"/>
                                                </div>
                                            )
                                        })

                                        }
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