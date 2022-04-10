export default function changeProfileValidation(thisComponent: any) {
    if (!thisComponent.state.username) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "changeProfileError",
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
            "changeProfileError",
            "email_empty"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "email",
        });
        return false;
    }

    if (
        thisComponent.state.newPassword !=
        thisComponent.state.newConfirmPassword
    ) {
        let lista: Map<string, string> = new Map<string, string>().set(
            "changeProfileError",
            "confirm_newPassowrd_not_equals"
        );
        thisComponent.setState({
            requestErrors: lista,
            requestOk: new Map<string, string>(),
            formError: "newPassword",
        });
        return false;
    }
    return true;
}
