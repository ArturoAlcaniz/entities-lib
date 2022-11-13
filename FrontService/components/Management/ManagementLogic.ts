import Router from "next/router";
import { obtainLimitedBy } from "./ManagementRequest";

function handleObtainLimitedBy(thisComponent) {
    obtainLimitedBy().then(
        (response) => {
            if (response.status == 200) {
                thisComponent.setState({
                    limitedByOptions: response.data
                })
            }
        }
    )
}

function handleGoCodesManage() {
    Router.push("management/codes")
}

function handleChangeCoins(event: any) {
    this.setState({coins: event.target.value })
}

function handleChangeId(event: any) {
    this.setState({id: event.target.value})
}

function handleChangeStartCode(event: any) {
    this.setState({starts: event.target.value})
}

function handleChangeEndCode(event: any) {
    this.setState({ends: event.target.value})
}

function handleChangeAmount(event: any) {
    this.setState({amount: event.target.value})
}

export { handleObtainLimitedBy, handleGoCodesManage, handleChangeCoins, handleChangeId, handleChangeStartCode, handleChangeEndCode, handleChangeAmount }