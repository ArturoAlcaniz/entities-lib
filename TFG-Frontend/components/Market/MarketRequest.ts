import axios, {AxiosPromise} from "axios";

function obtainMyProductRequest(thisComponent: any): AxiosPromise<any> {
    return axios({
        method: "get",
        url: `/api/products/obtain/${thisComponent.state.id}`,
        data: [],
    })
}

function obtainMyProductsRequest(): AxiosPromise<any> {
    return axios({
        method: "get",
        url: "/api/products/obtain",
        data: [],
    });
}

function obtainAllProductsRequest(): AxiosPromise<any> {
    return axios({
        method: "get",
        url: "/api/products/obtainAllAvailable",
        data: [],
    });
}

function deleteProductRequest(thisComponent: any): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/products/delete",
        data: {
            id: thisComponent.state.id
        }
    })
}

function modifyProductRequest(thisComponent: any): AxiosPromise<any> {
    let formData = new FormData()
    
    formData.append('id', thisComponent.state.id)
    formData.append('productname', thisComponent.state.productname)
    formData.append('description', thisComponent.state.description)
    formData.append('category', thisComponent.state.category)
    formData.append('startsell', thisComponent.state.startsell)
    formData.append('endsell', thisComponent.state.endsell)
    formData.append('price', thisComponent.state.price)
    
    let imagesIds = []
    thisComponent.state.imagesAlreadyAdded.map(function(item) {
        imagesIds.push(item['ID']);
    })

    formData.append('imagesAlreadyAdded', JSON.stringify(imagesIds))

    if(thisComponent.state.images != null){
        for (var i = 0; i < thisComponent.state.images.length; i++) {
            formData.append('images', thisComponent.state.images[i])
        }
        return axios.post("/api/products/modify",formData);
    }
}

function obtainCategories(): AxiosPromise<any> {
    return axios({
        method: "get",
        url: "/api/products/obtainCategories",
        data: [],
    });
}

function createProductRequest(thisComponent: any): AxiosPromise<any> {
    let formData = new FormData()
    
    formData.append('productname', thisComponent.state.productname)
    formData.append('description', thisComponent.state.description)
    formData.append('category', thisComponent.state.category)
    formData.append('startsell', thisComponent.state.startsell)
    formData.append('endsell', thisComponent.state.endsell)
    formData.append('price', thisComponent.state.price)

    if(thisComponent.state.images != null){
        for (var i = 0; i < thisComponent.state.images.length; i++) {
            formData.append('images', thisComponent.state.images[i])
        }
        return axios.post("/api/products/create",formData);
    }else{
        return axios({
            method: "post",
            url: "/api/products/createWithoutImages",
            data: {
                productname: thisComponent.state.productname,
                description: thisComponent.state.description,
                category: thisComponent.state.category,
                startsell: thisComponent.state.startsell,
                endsell: thisComponent.state.endsell,
                price: thisComponent.state.price,
            },
        });
    }
}

export {createProductRequest,obtainMyProductsRequest,obtainMyProductRequest,modifyProductRequest,deleteProductRequest,obtainAllProductsRequest,obtainCategories}