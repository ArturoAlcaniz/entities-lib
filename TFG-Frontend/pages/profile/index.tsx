import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import HeaderLogged from '@components/Commons/HeaderLogged';
import CustomErrorMessage from '@utils/CustomErrorMessage';
import { handleChangeProfile, showActualPass, showNewCPass, showNewPass } from '@components/Profile/ChangeProfileLogic';

export default class ProfilePage extends CustomBasicPage{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            username: this.props.username || "",
            email: this.props.email || "",
            actualPassword: "",
            newPassword: "",
            newConfirmPassword: "",
            showActualPassword: false,
            showNewPassword: false,
            showNewConfirmPassword: false,
            formError: ""
        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('changeProfileError')]
        const { username, email, actualPassword, newPassword, newConfirmPassword, showActualPassword, showNewPassword, showNewConfirmPassword, formError } = this.state

        return (
            <div>
                {super.render()}
                <HeaderLogged username={this.props.username}
                        email={this.props.email}
                        pathname={this.props.pathname} 
                        setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} />
                <div className="pageCentered">
                    <form onSubmit={handleChangeProfile.bind(this)} >
                        <div className="card loginForm">
                            <div className="card-content">
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["usuario"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={username} className={`input ${formError=='username' ? 'is-danger' : ''}`} type="text" autoComplete="off"></input>
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
                                        <input v-model={email} className={`input ${formError=='email' ? 'is-danger' : ''}`} type="email" autoComplete="off"></input>
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
                                        <input v-model={newPassword} className={`input inputpass fas ${formError=='newPassword' ? 'is-danger' : ''}`} type={showNewPassword ? "text" : "password"} autoComplete="off"></input>
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
                                        <input v-model={newConfirmPassword} className={`input inputpass fas ${formError=='newConfirmPassword' ? 'is-danger' : ''}`} type={showNewConfirmPassword ? "text" : "password"} autoComplete="off"></input>
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
                                        <input v-model={actualPassword} className={`input inputpass fas ${formError=='actualPassword' ? 'is-danger' : ''}`} type={showActualPassword ? "text" : "password"} autoComplete="off"></input>
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