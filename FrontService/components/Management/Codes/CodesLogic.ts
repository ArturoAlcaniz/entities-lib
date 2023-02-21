import Router from "next/router";
import {
    createCodeRequest,
    obtainAllCodesRequest,
    redeemCodeRequest,
} from "./CodesRequest";

function handleGoCreateCodes() {
    Router.push("codes/create");
}

function handleCreateCode(event: any) {
    event.preventDefault();

    createCodeRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "createCodeOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "createCodeError",
                error.response.data.message[0]
            );
            this.setState({
                formError: error.response.data.formError,
                requestOK: new Map<string, string>(),
                requestErrors: lista,
            });
        }
    );
}

async function handleObtainAllCodes(thisComponent) {
    await obtainAllCodesRequest().then(
        (response) => {
            if (response.status == 200) {
                let codesArray: Array<any> = [];
                for (let i = 0; i < response.data.length; i++) {
                    codesArray.push(response.data[i]);
                }
                thisComponent.setState({codes: codesArray});
            }
        },
        (error) => {
            console.log(error);
        }
    );
}

function handleChangeCode(event: any) {
    this.setState({codeRedeem: event.target.value});
}

function handleRedeemCode(event: any) {
    redeemCodeRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "redeemCodeOk",
                    response.data.message[0]
                );
                this.setState(
                    {
                        formError: "",
                        requestOK: lista,
                        requestErrors: new Map<string, string>(),
                        coins: response.data.COINS,
                    },
                    this.headerViewRef.current.setState({
                        coins: response.data.COINS,
                    })
                );
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "redeemCodeError",
                error.response.data.message[0]
            );
            this.setState({
                formError: error.response.data.formError,
                requestOK: new Map<string, string>(),
                requestErrors: lista,
            });
        }
    );
}

export {
    handleGoCreateCodes,
    handleCreateCode,
    handleObtainAllCodes,
    handleChangeCode,
    handleRedeemCode,
};
