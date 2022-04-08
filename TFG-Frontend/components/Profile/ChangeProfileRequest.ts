import axios, {AxiosPromise} from "axios";

export default function changeProfileRequest(thisComponent: any): AxiosPromise<any> {
    let newPass = null;
    if(thisComponent.state.newPassword){
       newPass = thisComponent.state.newPassword 
    }
    return axios({
        method: "post",
        url: "/api/users/modify",
        data: {
            username: thisComponent.state.username,
            email: thisComponent.state.email,
            newPass: newPass,
            pass: thisComponent.state.actualPassword,
        },
    });
}
