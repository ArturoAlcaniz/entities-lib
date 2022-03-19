import axios, {AxiosPromise} from "axios";

function loginGoogleRequest(response: any): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/loginGoogle",
        data: {
            token: response.tokenObj.id_token,
        },
    });
}

function loginRequest(thisComponent: any): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/login",
        data: {
            email: thisComponent.state.email,
            pass: thisComponent.state.password,
        },
    });
}

export {loginGoogleRequest, loginRequest};
