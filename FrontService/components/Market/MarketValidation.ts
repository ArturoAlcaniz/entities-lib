export function modifyProductValidation(thisComponent: any) {
    if (!thisComponent.state.id) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "modifyProductError",
            "product_notexist"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "product",
        });
        return false;
    }

    if (!thisComponent.state.productname) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "modifyProductError",
            "productname_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "name",
        });
        return false;
    }

    if (!thisComponent.state.category) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "modifyProductError",
            "productcategory_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "category",
        });
        return false;
    }

    if (!thisComponent.state.description) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "modifyProductError",
            "productdescription_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "description",
        });
        return false;
    }

    if (!thisComponent.state.price) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "modifyProductError",
            "productprice_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "price",
        });
        return false;
    }
    return true;
}

export function createProductValidation(thisComponent: any) {
    if (!thisComponent.state.productname) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "createProductError",
            "productname_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "name",
        });
        return false;
    }

    if (!thisComponent.state.category) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "createProductError",
            "productcategory_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "category",
        });
        return false;
    }

    if (!thisComponent.state.description) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "createProductError",
            "productdescription_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "description",
        });
        return false;
    }

    if (!thisComponent.state.price) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "createProductError",
            "productprice_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "price",
        });
        return false;
    }
    return true;
}
