import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import Header from '@components/Commons/Header';
import {handleRegister, handleSendCode, showCPass, showPass} from '@components/Register/RegisterLogic';
import CustomErrorMessage from '@utils/CustomErrorMessage';

export default class RegisterPage extends CustomBasicPage{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            step: "1",
            code: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            formError: "",
            showPassword: false,
            showCPassword: false,
        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { username, email, password, confirmPassword, showPassword, showCPassword, formError, step, code } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('registerError')]

        return (
            <div>
                {super.render()}
                <Header setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} 
                        pathname={this.props.pathname} />
                <div className="pageCentered">
                    <form onSubmit={step == "1" ?  handleSendCode.bind(this) : handleRegister.bind(this)} >
                        <div className="card registerForm">
                            <div className="card-content">
                                <div className={`field ${step=='2' ? 'hidden' : ''}`}>
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
                                <div className={`field ${step=='2' ? 'hidden' : ''}`}>
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
                                <div className={`field ${step=='2' ? 'hidden' : ''}`}>
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
                                </div>
                                <div className={`field ${step=='2' ? 'hidden' : ''}`}>
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["confirm_pass"]}
                                    </label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input v-model={confirmPassword} className={`input inputpass fas ${formError=='cPassword' ? 'is-danger' : ''}`} type={showCPassword ? "text" : "password"} autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i onMouseUp={(e) => {e.preventDefault()}} onMouseDown={(e) => {e.preventDefault()}} className={`showpass fas fa-eye${showCPassword ? '' : '-slash'}`} onClick={showCPass.bind(this)}></i>
                                        </span>
                                    </div>
                                    { formError=='cPassword' && CustomErrorMessage(msgError) }
                                </div>
                                <div className={`field ${step=='1' ? 'hidden' : ''}`}>
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["email_code"]}
                                    </label>
                                    <div className="control">
                                        <input v-model={code} className="input"></input>
                                    </div>
                                </div>
                                <p className="help form-feedback-ok">
                                    {obtainTextTranslated["requestOK"][this.state.requestOK.get('registerOk')]}
                                </p>
                                <div className="field">
                                    <p className="control">
                                        <button className="button">
                                            {obtainTextTranslated["buttons"]["registro"]}
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