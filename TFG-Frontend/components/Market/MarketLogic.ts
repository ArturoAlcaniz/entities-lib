import Router from "next/router";
import { createProductRequest, deleteProductRequest, modifyProductRequest, obtainAllProductsRequest, obtainMyProductRequest, obtainMyProductsRequest } from "./MarketRequest";
import {createProductValidation, modifyProductValidation } from "./MarketValidation";

export function uploadImageProduct(event: any) {
    if (event.target.files && event.target.files.length>0) {

        this.setState({images: event.target.files});
    }
}

async function handleGoProduct(ID) {
    Router.push(`/sell/my-product?product=${ID}`, '/sell/my-product')
}

async function handleObtainMyProduct(thisComponent) {
    await obtainMyProductRequest(thisComponent).then(
        (response) => {
            if (response.status == 200) {
                thisComponent.setState(
                    {
                        product: response.data[0],
                        productname: response.data[0].PRODUCTNAME, 
                        description: response.data[0].DESCRIPTION,
                        category: response.data[0].CATEGORY,
                        imagesAlreadyAdded: response.data[0].IMAGES,
                        startsell: response.data[0].STARTS.slice(0, response.data[0].STARTS.length-8),
                        endsell: response.data[0].ENDS.slice(0, response.data[0].ENDS.length-8),
                        price: response.data[0].PRICE
                    }
                )
            }
        }
    )
}

async function handleObtainMyProducts(thisComponent) {

    await obtainMyProductsRequest().then(
        (response) => {
            if (response.status == 200) {
                let productsArray: Array<any> = []
                for(let i=0; i<response.data.length; i++){
                    productsArray.push(response.data[i])
                }
                thisComponent.setState({myProducts: productsArray});
            }
        },
        (error) => {
            console.log(error)
        }
    )
}

async function handleObtainAllProducts(thisComponent) {

    await obtainAllProductsRequest().then(
        (response) => {
            if (response.status == 200) {
                let productsArray: Array<any> = []
                for(let i=0; i<response.data.length; i++){
                    productsArray.push(response.data[i])
                }
                thisComponent.setState({products: productsArray});
            }
        },
        (error) => {
            console.log(error)
        }
    )
}

function handleDeleteProduct(thisComponent: any) {
    deleteProductRequest(thisComponent).then(
        (response) => {
            if (response.status == 200) {
                Router.push("/sell/my-products");
            }
        }
    )
}

function handleModifyProduct(event: any) {
    event.preventDefault();

    if(!modifyProductValidation(this)){
        return;
    }

    modifyProductRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "modifyProductOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "modifyProductError",
                error.response.data.message[0]
            );
            this.setState({
                formError: error.response.data.formError,
                requestOK: new Map<string, string>(),
                requestErrors: lista,
            });
        }
    )

}

function handleCreateProduct(event: any) {
    event.preventDefault();

    if(!createProductValidation(this)){
        return;
    }

    createProductRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "createProductOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "createProductError",
                error.response.data.message[0]
            );
            this.setState({
                formError: error.response.data.formError,
                requestOK: new Map<string, string>(),
                requestErrors: lista,
            });
        }
    )
}

export {handleCreateProduct,handleObtainMyProducts,handleObtainMyProduct,handleGoProduct,handleModifyProduct,handleDeleteProduct,handleObtainAllProducts}