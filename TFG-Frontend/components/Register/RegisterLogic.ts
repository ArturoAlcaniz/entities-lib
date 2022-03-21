import registerRequest from "./RegisterRequest";
import registerValidation from "./RegisterValidation";

export default function handleRegister(event: any) {
    event.preventDefault();

    registerValidation(this);

    if (this.state.requestErrors.size > 0) {
        return;
    }

    registerRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "registerOk",
                    response.data.message[0]
                );
                this.setState({
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "registerError",
                error.response.data.message[0]
            );
            this.setState({
                requestErrors: lista,
                requestOK: new Map<string, string>(),
            });
        }
    );
}
