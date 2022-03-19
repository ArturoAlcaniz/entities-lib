export default function registerValidation(thisComponent: any) {
    if (thisComponent.state.password != thisComponent.state.confirmPassword) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "registerError",
            "confirm_password_not_equals"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOK: new Map<string, string>(),
        });
        thisComponent.setState({password: "", confirmPassword: ""});
        return;
    }
}
