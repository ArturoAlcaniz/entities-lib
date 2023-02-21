import axios, {AxiosPromise} from "axios";

export default function changeProfileRequest(
    thisComponent: any
): AxiosPromise<any> {
    let formData = new FormData();

    formData.append("username", thisComponent.state.username);
    formData.append("email", thisComponent.state.email);
    formData.append("newPass", thisComponent.state.newPassword);
    formData.append("pass", thisComponent.state.actualPassword);
    if (thisComponent.state.avatar != null) {
        formData.append("avatar", thisComponent.state.avatar);
        return axios.post("/api/users/modify", formData);
    } else {
        return axios({
            method: "post",
            url: "/api/users/modifyWithoutAvatar",
            data: {
                username: thisComponent.state.username,
                email: thisComponent.state.email,
                newPass: thisComponent.state.newPassword,
                pass: thisComponent.state.actualPassword,
            },
        });
    }
}
