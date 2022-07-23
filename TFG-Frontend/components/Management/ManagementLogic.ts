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

export { handleObtainLimitedBy }