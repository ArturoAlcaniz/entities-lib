import axios, {AxiosPromise} from "axios";

function buyCoinsRequest(id: string): AxiosPromise<any> {
    return axios({
        method: "post",
        url: `/api/users/buyCoins`,
        data: {
            id: id,
        },
    });
}

export {buyCoinsRequest};
