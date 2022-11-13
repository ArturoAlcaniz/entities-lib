import Router from "next/router";
import { createProductRequest, deleteProductRequest, modifyProductRequest, obtainAllProductsRequest, obtainCategories, obtainMyProductRequest, obtainMyProductsRequest } from "./MarketRequest";
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
                let start = ""
                let end = ""

                if(response.data[0].STARTS != null && response.data[0].STARTS.length > 0) {
                    start = response.data[0].STARTS.slice(0, response.data[0].STARTS.length-8)
                }

                if(response.data[0].ENDS != null && response.data[0].ENDS.length > 0) {
                    end = response.data[0].ENDS.slice(0, response.data[0].ENDS.length-8)
                }

                thisComponent.setState(
                    {
                        product: response.data[0],
                        productname: response.data[0].PRODUCTNAME, 
                        description: response.data[0].DESCRIPTION,
                        category: response.data[0].CATEGORY,
                        imagesAlreadyAdded: response.data[0].IMAGES,
                        startsell: start,
                        endsell: end,
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

function handleObtainCategories(thisComponent) {
    obtainCategories().then(
        (response) => {
            if (response.status == 200) {
                thisComponent.setState({
                    productCategories: response.data
                });
            }
        },
        () => {}
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

function handleChangeProductName(event: any) {
    this.setState({productname: event.target.value})
}

function handleChangeCategory(event: any) {
    this.setState({category: event.target.value})
}

function handleChangeDescription(event: any) {
    this.setState({description: event.target.value})
}

function handleChangeStartSell(event: any) {
    this.setState({startsell: event.target.value})
}

function handleChangeEndsell(event: any) {
    this.setState({endsell: event.target.value})
}

function handleChangePrice(event: any) {
    this.setState({price: event.target.value})
}
export {handleCreateProduct,handleObtainMyProducts,handleObtainMyProduct,handleGoProduct,handleModifyProduct,handleDeleteProduct,
    handleObtainAllProducts,handleObtainCategories,handleChangeProductName,handleChangeCategory,handleChangeDescription,handleChangeStartSell,
    handleChangeEndsell, handleChangePrice}