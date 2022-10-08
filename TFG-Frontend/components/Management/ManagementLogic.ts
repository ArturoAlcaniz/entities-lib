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


export { handleObtainLimitedBy, handleGoCodesManage }