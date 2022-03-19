import axios, {AxiosPromise} from "axios";

export default function registerRequest(thisComponent: any): AxiosPromise<any> {
    return axios({
        method: "post",
        url: "/api/users/register",
        data: {
            username: thisComponent.state.username,
            email: thisComponent.state.email,
            pass: thisComponent.state.password,
        },
    });
}
