import React from 'react'
import CustomErrorMessage from '@utils/CustomErrorMessage';
import { handleChangeProfile, showActualPass, showNewCPass, showNewPass, uploadAvatar, handleChangeUsername, handleChangeEmail, handleChangeNewPassword,
    handleChangeNewConfirmPassword, handleChangeActualPassord } from '@components/Profile/ChangeProfileLogic';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';

export default class ProfilePage extends CustomBasicPageLogged{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            username: this.props.username || "",
            email: this.props.email || "",
            actualPassword: "",
            newPassword: "",
            avatar: null,
            newConfirmPassword: "",
            showActualPassword: false,
            showNewPassword: false,
            showNewConfirmPassword: false,
            componentName: "Profile | TI-Shop",
            formError: ""
        }
    }

    obtainUsernameClass(): string {
        return `input ${this.state.formError=='username' ? 'is-danger' : ''}`
    }

    obtainEmailClass(): string {
        return `input ${this.state.formError=='email' ? 'is-danger' : ''}`
    }

    obtainNewpasswordClass(): string {
        return `input inputpass fas ${this.state.formError=='newPassword' ? 'is-danger' : ''}`
    }

    obtainNewpasswordconfirmClass(): string {
        return `input inputpass fas ${this.state.formError=='newConfirmPassword' ? 'is-danger' : ''}`
    }

    obtainActualpasswordClass(): string {
        return `input inputpass fas ${this.state.formError=='actualPassword' ? 'is-danger' : ''}`
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('changeProfileError')]
        const { username, avatar, email, actualPassword, newPassword, newConfirmPassword, showActualPassword, showNewPassword, showNewConfirmPassword, formError } = this.state

        return (
            <div>
                {super.render()}
                <div className="pageCentered">
                    <form onSubmit={handleChangeProfile.bind(this)} >
                        <div className="card loginForm">
                            <div className="card-content">
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["avatar"]}
                                    </label>
                                    <div className="control">
                                        <input type="file" name="myAvatar" onChange={uploadAvatar.bind(this)} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["usuario"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input value={username} onChange={handleChangeUsername.bind(this)} className={this.obtainUsernameClass()} type="text" autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                    { formError=='username' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["correo"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input value={email} onChange={handleChangeEmail.bind(this)} className={this.obtainEmailClass()} type="email" autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>    
                                        </span>
                                    </div>
                                    { formError=='email' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["newPass"]}
                                    </label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input value={newPassword} onChange={handleChangeNewPassword.bind(this)} className={this.obtainNewpasswordClass()} type={showNewPassword ? "text" : "password"} autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i onMouseUp={(e) => {e.preventDefault()}} onMouseDown={(e) => {e.preventDefault()}} className={`showpass fas fa-eye${showNewPassword ? '' : '-slash'}`} onClick={showNewPass.bind(this)}></i>
                                        </span>
                                    </div>
                                    { formError=='newPassword' && CustomErrorMessage(msgError) }
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["confirm_newPass"]}
                                    </label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input value={newConfirmPassword} onChange={handleChangeNewConfirmPassword.bind} className={this.obtainNewpasswordconfirmClass()} type={showNewConfirmPassword ? "text" : "password"} autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i onMouseUp={(e) => {e.preventDefault()}} onMouseDown={(e) => {e.preventDefault()}} className={`showpass fas fa-eye${showNewConfirmPassword ? '' : '-slash'}`} onClick={showNewCPass.bind(this)}></i>
                                        </span>
                                    </div>
                                    { formError=='newConfirmPassword' && CustomErrorMessage(msgError) }
                                </div>

                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["actualPass"]}
                                    </label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input value={actualPassword} onChange={handleChangeActualPassord.bind(this)} className={this.obtainActualpasswordClass()} type={showActualPassword ? "text" : "password"} autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i onMouseUp={(e) => {e.preventDefault()}} onMouseDown={(e) => {e.preventDefault()}} className={`showpass fas fa-eye${showActualPassword ? '' : '-slash'}`} onClick={showActualPass.bind(this)}></i>
                                        </span>
                                    </div>
                                    { formError=='actualPassword' && CustomErrorMessage(msgError) }
                                </div>
                                <p className="help form-feedback-ok">
                                    {obtainTextTranslated["requestOK"][this.state.requestOK.get('changeProfileOk')]}
                                </p>
                                <div className="field">
                                    <p className="control">
                                        <button className="button">
                                            {obtainTextTranslated["buttons"]["save"]}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}