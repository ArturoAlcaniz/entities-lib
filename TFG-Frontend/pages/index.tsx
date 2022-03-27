import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import Header from '@components/Commons/Header';
import { handleLogin, handleButtonLoginGoogle, showPass } from '@components/Login/LoginLogic';
import CustomErrorMessage from '@utils/CustomErrorMessage';

export default class LoginPage extends CustomBasicPage{
    bannedInterval: any;
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            email: "",
            password: "",
            showPassword: false,
            formError: "",
            bannedSeconds: "",
        }

        this.bannedInterval = null
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { email, password, showPassword, formError, bannedSeconds } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('loginError')]

        return (
            <div>
                {super.render()}
                <Header setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} 
                        pathname={this.props.pathname} />
                <div className="pageCentered">
                    <form onSubmit={handleLogin.bind(this)} >
                        <div className="card loginForm">
                            <div className="card-content">
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
                                        {obtainTextTranslated["labels"]["pass"]}
                                    </label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input v-model={password} className={`input inputpass fas ${formError=='password' ? 'is-danger' : ''}`} type={showPassword ? "text" : "password"} autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i onMouseUp={(e) => {e.preventDefault()}} onMouseDown={(e) => {e.preventDefault()}} className={`showpass fas fa-eye${showPassword ? '' : '-slash'}`} onClick={showPass.bind(this)}></i>
                                        </span>
                                    </div>
                                    { formError=='password' && CustomErrorMessage(msgError) }
                                    { formError=='too_many_attempts' && CustomErrorMessage(msgError+' '+bannedSeconds+' '+obtainTextTranslated["explanations"]["seconds"]) }
                                </div>
                                <p className="help form-feedback-ok">
                                    {obtainTextTranslated["requestOK"][this.state.requestOK.get('loginOk')]}
                                </p>
                                <div className="field">
                                    <p className="control">
                                        <button className="button">
                                            {obtainTextTranslated["buttons"]["login"]}
                                        </button>
                                    </p>
                                </div>
                                <div className="google-btn" onClick={handleButtonLoginGoogle.bind(this)}>
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                                    </div>
                                    <p className="btn-text"><b>{obtainTextTranslated["buttons"]["login_google"]}</b></p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}