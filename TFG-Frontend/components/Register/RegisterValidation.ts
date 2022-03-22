export default function registerValidation(thisComponent: any) {
    if (!thisComponent.state.username) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "registerError",
            "username_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "username",
        });
        return false;
    }
    if (!thisComponent.state.email) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "registerError",
            "email_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "email",
        });
        return false;
    }
    if (!thisComponent.state.password) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "registerError",
            "pass_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "password",
        });
        return false;
    }
    if (thisComponent.state.password != thisComponent.state.confirmPassword) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "registerError",
            "confirm_password_not_equals"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOK: new Map<string, string>(),
            formError: "cPassword",
        });
        thisComponent.setState({password: "", confirmPassword: ""});
        return false;
    }
    return true;
}
