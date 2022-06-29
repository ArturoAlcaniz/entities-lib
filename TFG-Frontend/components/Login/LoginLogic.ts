import Router from "next/router";
import {
    loginGoogleRequest,
    loginRequest,
    obtainAvatar,
    sendCodeRequest,
} from "./LoginRequest";
import loginValidation from "./LoginValidation";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {firebaseApp} from "@root/firebase-config";

function handleButtonLoginGoogle() {
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account",
    });

    signInWithPopup(firebaseAuth, provider).then((response: any) => {
        handleLoginToBack(this, response._tokenResponse.oauthIdToken);
    });
}

function handleLoginToBack(thisComponent, idToken: string) {
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
                document.cookie = `email=${response.data.EMAIL};`;
                document.cookie = `coins=${response.data.COINS};`;
                document.cookie = `avatar=${response.data.AVATAR};`;
                setTimeout(() => {
                    Router.push("buy");
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

function handleLogin2(event: any) {
    event.preventDefault();

    sendCodeRequest(this).then(
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
                document.cookie = `email=${response.data.EMAIL};`;
                document.cookie = `coins=${response.data.COINS};`;
                document.cookie = `avatar=${response.data.AVATAR};`;
                setTimeout(() => {
                    Router.push("buy");
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
                    step: "2",
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "loginError",
                error.response.data.message[0]
            );
            let secondsBanned = "";
            if (error.response.data.bannedDuring) {
                secondsBanned = error.response.data.bannedDuring;
            }
            this.setState({
                formError: error.response.data.formError,
                requestErrors: lista,
                bannedSeconds: secondsBanned,
                requestOK: new Map<string, string>(),
            });
            bannedCountdown(this);
        }
    );
}

function bannedCountdown(thisComponent) {
    if (thisComponent.bannedInterval) {
        clearInterval(thisComponent.bannedInterval);
    }
    thisComponent.bannedInterval = setInterval(function () {
        let actualValue = parseInt(thisComponent.state.bannedSeconds);
        let newValue = 0;

        if (actualValue > 0) newValue = actualValue - 1;

        thisComponent.setState({bannedSeconds: newValue.toString()});

        if (newValue === 0) {
            clearInterval(thisComponent.bannedInterval);
        }
    }, 1000);
}

export {handleLogin, handleButtonLoginGoogle, showPass, handleLogin2};
