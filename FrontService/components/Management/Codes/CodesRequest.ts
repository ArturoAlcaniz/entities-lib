import axios, {AxiosPromise} from "axios";

export function createCodeRequest(thisComponent: any): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/createCodeToken",
        data: {
            id: thisComponent.state.id,
            coins: thisComponent.state.coins,
            starts: thisComponent.state.starts,
            ends: thisComponent.state.ends,
            amount: thisComponent.state.amount,
        },
    });
}

export function redeemCodeRequest(thisComponent: any): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/redeemCodeToken",
        data: {
            id: thisComponent.state.codeRedeem,
        },
    });
}

export function obtainAllCodesRequest(): AxiosPromise<any> {
    return axios({
        method: "get",
        url: "/api/users/obtainAllCodes",
        data: [],
    });
}
