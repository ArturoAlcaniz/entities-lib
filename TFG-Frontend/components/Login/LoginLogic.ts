import Router from "next/router";
import {loginGoogleRequest, loginRequest} from "./LoginRequest";

function handleLoginGoogle(response: any) {
    loginGoogleRequest(response).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "loginOk",
                    response.data.message[0]
                );
                this.setState({
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
                document.cookie = `username=${response.data.USERNAME};`;
                setTimeout(() => {
                    Router.push("home");
                }, 1000);
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "loginError",
                error.response.data.message[0]
            );
            this.setState({
                requestErrors: lista,
                requestOK: new Map<string, string>(),
            });
        }
    );
}

function handleLogin(event: any) {
    event.preventDefault();
    loginRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "loginOk",
                    response.data.message[0]
                );
                this.setState({
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
                document.cookie = `username=${response.data.USERNAME};`;
                setTimeout(() => {
                    Router.push("home");
                }, 1000);
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "loginError",
                error.response.data.message[0]
            );
            this.setState({
                requestErrors: lista,
                requestOK: new Map<string, string>(),
            });
        }
    );
}

export {handleLogin, handleLoginGoogle};
