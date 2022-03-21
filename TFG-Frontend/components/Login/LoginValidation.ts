export default function loginValidation(thisComponent: any) {
    if (!thisComponent.state.email) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "loginError",
            "email_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
        });
        return;
    }

    if (!thisComponent.state.pass) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "registerError",
            "pass_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
        });
        return;
    }
}
