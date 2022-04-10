import axios, {AxiosPromise} from "axios";

function registerRequest(thisComponent: any): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/register2",
        data: {
            username: thisComponent.state.username,
            email: thisComponent.state.email,
            pass: thisComponent.state.password,
            code: thisComponent.state.code,
        },
    });
}

function sendCodeRequest(thisComponent: any): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/register",
        data: {
            email: thisComponent.state.email,
        },
    });
}

export {registerRequest, sendCodeRequest};
