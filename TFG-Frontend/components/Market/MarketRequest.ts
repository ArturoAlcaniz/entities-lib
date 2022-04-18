import axios, {AxiosPromise} from "axios";

function createProductRequest(thisComponent: any): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/products/create",
        data: {
            productname: thisComponent.state.productname,
            description: thisComponent.state.description,
            category: thisComponent.state.category,
            price: thisComponent.state.price,
        },
    });
}

export {createProductRequest}