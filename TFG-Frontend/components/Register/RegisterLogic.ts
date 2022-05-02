import {registerRequest, sendCodeRequest} from "./RegisterRequest";
import registerValidation from "./RegisterValidation";


function errorRegister(error, thisComponent) {
    let lista: Map<string, string> = new Map<string, string>().set(
        "registerError",
        error.response.data.message[0]
    );
    thisComponent.setState({
        formError: error.response.data.formError,
        requestErrors: lista,
        requestOK: new Map<string, string>(),
    });
}

function handleSendCode(event: any) {
    event.preventDefault();

    if (!registerValidation(this)) {
        return;
    }

    sendCodeRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "registerOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
                    requestOK: lista,
                    step: "2",
                    requestErrors: new Map<string, string>(),
                });
            }
        },
        (error) => {
            errorRegister(error, this)
        }
    );
}

function handleRegister(event: any) {
    event.preventDefault();

    registerRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "registerOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
                    step: "1",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
            }
        },
        (error) => {
            errorRegister(error, this)
        }
    );
}

function showPass(event: any) {
    event.preventDefault();
    this.setState({showPassword: !this.state.showPassword});
}

function showCPass(event: any) {
    event.preventDefault();
    this.setState({showCPassword: !this.state.showCPassword});
}

export {handleRegister, handleSendCode, showCPass, showPass};
