import Router from "next/router";
import {loginGoogleRequest, loginRequest} from "./LoginRequest";
import loginValidation from "./LoginValidation";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {firebaseApp} from '@root/firebase-config'

function handleButtonLoginGoogle() {
    const firebaseAuth = getAuth(firebaseApp)
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    signInWithPopup(firebaseAuth, provider)
        .then((response:any) => {
            handleLoginToBack(this,response._tokenResponse.oauthIdToken)
        }
    )
}

function handleLoginToBack(thisComponent,idToken: string){
    loginGoogleRequest(idToken).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "loginOk",
                    response.data.message[0]
                );
                thisComponent.setState({
                    formError: "",
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
            thisComponent.setState({
                formError: "",
                requestErrors: lista,
                requestOK: new Map<string, string>(),
            });
        }
    );
}

function showPass(event: any) {
    event.preventDefault();
    this.setState({showPassword: !this.state.showPassword});
}

function handleLogin(event: any) {
    event.preventDefault();

    if (!loginValidation(this)) {
        return;
    }

    loginRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "loginOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
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
                formError: error.response.data.formError,
                requestErrors: lista,
                requestOK: new Map<string, string>(),
            });
        }
    );
}

export {handleLogin, handleButtonLoginGoogle, showPass};
