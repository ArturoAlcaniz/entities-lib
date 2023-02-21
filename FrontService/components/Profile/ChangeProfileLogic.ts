import Router from "next/router";
import ChangeProfileRequest from "./ChangeProfileRequest";
import changeProfileValidation from "./ChangeProfileValidation";

function uploadAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];

        this.setState({avatar: i});
    }
}

function handleChangeProfile(event: any) {
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
                document.cookie = `avatar=${response.data.AVATAR};`;
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

function showNewPass(event: any) {
    event.preventDefault();
    this.setState({showNewPassword: !this.state.showNewPassword});
}

function showNewCPass(event: any) {
    event.preventDefault();
    this.setState({showNewConfirmPassword: !this.state.showNewConfirmPassword});
}

function showActualPass(event: any) {
    event.preventDefault();
    this.setState({showActualPassword: !this.state.showActualPassword});
}

function handleChangeUsername(event: any) {
    this.setState({username: event.target.value});
}

function handleChangeEmail(event: any) {
    this.setState({email: event.target.value});
}

function handleChangeNewPassword(event: any) {
    this.setState({newPassword: event.target.value});
}

function handleChangeNewConfirmPassword(event: any) {
    this.setState({newConfirmPassword: event.target.value});
}

function handleChangeActualPassord(event: any) {
    this.setState({actualPassword: event.target.value});
}
export {
    showActualPass,
    showNewCPass,
    showNewPass,
    handleChangeProfile,
    uploadAvatar,
    handleChangeUsername,
    handleChangeEmail,
    handleChangeNewPassword,
    handleChangeNewConfirmPassword,
    handleChangeActualPassord,
};
