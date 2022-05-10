import Router from "next/router";
import { createProductRequest } from "./MarketRequest";
import createProductValidation from "./MarketValidation";

export function uploadImageProduct(event: any) {
    if (event.target.files && event.target.files.length>0) {

        this.setState({images: event.target.files});
    }
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

export {handleCreateProduct}