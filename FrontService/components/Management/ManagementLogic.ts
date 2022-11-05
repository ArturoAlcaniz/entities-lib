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

function handleChangeLimitedby(event: any) {
    this.setState({limitedBy: event.target.value})
}

function handleChangeCoins(event: any) {
    this.setState({coins: event.target.value })
}

export { handleObtainLimitedBy, handleGoCodesManage, handleChangeLimitedby, handleChangeCoins }