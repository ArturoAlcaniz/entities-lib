export default function loginValidation(thisComponent: any) {
    if (!thisComponent.state.email) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "loginError",
            "email_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: 'email',
        });
        return false;
    }

    if (!thisComponent.state.password) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "loginError",
            "pass_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: 'password',
        });
        return false;
    }
    return true;
}
