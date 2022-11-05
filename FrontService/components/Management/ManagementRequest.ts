import axios, {AxiosPromise} from "axios";

function obtainLimitedBy(): AxiosPromise<any>  {
    return axios({
        method: "get",
        url: "/api/users/obtainLimitedBy",
        data: []
    })
}

export { obtainLimitedBy }