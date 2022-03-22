import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import Header from '@components/Commons/Header';
import { GoogleLogin } from 'react-google-login';
import { handleLogin, handleLoginGoogle } from '@components/Login/LoginLogic';
import CustomErrorMessage from '@utils/CustomErrorMessage';


export default class LoginPage extends CustomBasicPage{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            email: "",
            password: "",
            formError: "",
        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { email, password, formError } = this.state
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
                                    <div className="control has-icons-left">
                                        <input v-model={password} className={`input ${formError=='password' ? 'is-danger' : ''}`} type="password" autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </div>
                                    { formError=='password' && CustomErrorMessage(msgError) }
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
                                <GoogleLogin
                                    clientId="388959240870-7qf8j10dc0ktavi36k4ilrcrrqqb6sfk.apps.googleusercontent.com"
                                    buttonText={obtainTextTranslated["buttons"]["login_google"]}
                                    onSuccess={handleLoginGoogle.bind(this)}
                                    onFailure={handleLoginGoogle.bind(this)}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}