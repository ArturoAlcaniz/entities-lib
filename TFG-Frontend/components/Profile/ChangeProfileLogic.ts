import Router from "next/router";
import ChangeProfileRequest from "./ChangeProfileRequest";
import changeProfileValidation from "./ChangeProfileValidation";

export function uploadAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
  
        this.setState({avatar: i});
    }
}

export function handleChangeProfile(event: any) {
    event.preventDefault();

    if (!changeProfileValidation(this)) {
        return;
    }

    ChangeProfileRequest(this).then(
        (response) => {
            if (response.status == 200) {
                let lista: Map<string, string> = new Map<string, string>().set(
                    "changeProfileOk",
                    response.data.message[0]
                );
                this.setState({
                    formError: "",
                    requestOK: lista,
                    requestErrors: new Map<string, string>(),
                });
                document.cookie = `username=${this.state.username};`;
                document.cookie = `email=${this.state.email};`;
                setTimeout(() => {
                    Router.push("profile");
                }, 1000);
            }
        },
        (error) => {
            let lista: Map<string, string> = new Map<string, string>().set(
                "changeProfileError",
                error.response.data.message[0]
            );
            this.setState({
                formError: error.response.data.formError,
                requestErrors: lista,
                requestOK: new Map<string, string>(),
            });
        }
    );
}

export function showNewPass(event: any) {
    event.preventDefault();
    this.setState({showNewPassword: !this.state.showNewPassword});
}

export function showNewCPass(event: any) {
    event.preventDefault();
    this.setState({showNewConfirmPassword: !this.state.showNewConfirmPassword});
}

export function showActualPass(event: any) {
    event.preventDefault();
    this.setState({showActualPassword: !this.state.showActualPassword});
}
