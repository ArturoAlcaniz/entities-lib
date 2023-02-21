import {buyCoinsRequest} from "./PaymentsRequest";

async function handleBuyCoins(id: string, thisComponent: any): Promise<string> {
    let languageSelected = thisComponent.state.languageSelected;
    let obtainTextTranslated = thisComponent.translations[languageSelected];

    var msgResult = "";

    await buyCoinsRequest(id).then(
        (response) => {
            if (response.status == 200) {
                document.cookie = `coins=${response.data.COINS};`;
                thisComponent.headerLogged.current.changeCoins(
                    response.data.COINS
                );
                msgResult =
                    obtainTextTranslated["requestOK"][response.data.message[0]];
            }
        },
        () => {
            msgResult = "Error buying coins";
        }
    );

    return msgResult;
}

function handleChangeCoinsToBuy(event: any) {
    this.setState({coinsToBuy: event.target.value});
}

export {handleBuyCoins, handleChangeCoinsToBuy};
