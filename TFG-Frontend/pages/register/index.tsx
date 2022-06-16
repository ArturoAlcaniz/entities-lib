import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import Header from '@components/Commons/Header';
import {handleRegister, handleSendCode, showCPass, showPass} from '@components/Register/RegisterLogic';
import CustomErrorMessage from '@utils/CustomErrorMessage';
import Link from 'next/link';
import cookies from 'next-cookies';
import passwordStrengthMeter from '@root/components/Commons/PasswordStrengthMeter';

export default class RegisterPage extends CustomBasicPage{
    static async getInitialProps(ctx: any) {
        return {
            pathname: ctx.pathname,
            initialLanguageSelected: cookies(ctx).languageSelected || 'english',
            username: cookies(ctx).username,
            email: cookies(ctx).email,
            avatar: cookies(ctx).avatar,
            stepParam: ctx.query.step,
            codeParam: ctx.query.code,
        }
    }

    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            code: props.codeParam || "",
            step: props.stepParam || "1",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            formError: "",
            componentName: "Register | TI-Shop",
            passwordStrength: "0",
            passwordStrengthText: "",
            showPassword: false,
            showCPassword: false,
        }
    }
    loadPasswordStrength(event) {
        let points = 0

        if((new RegExp("^(?=.*[a-z])").test(event.target.value))){
            points++
        }

        if((new RegExp("^(?=.*[A-Z])").test(event.target.value))){
            points++
        }

        if((new RegExp("^(?=.*[0-9])").test(event.target.value))){
            points++
        }

        if((new RegExp("^(?=.*[°<>#*~!\".§$%?®©¶])").test(event.target.value))){
            points++
        }

        if(event.target.value.length >= 8){
            points++
        }

        let newPasswordStrengthText = ""

        if(points>0 && points<3) {
            newPasswordStrengthText = "Weak"    
        }

        if(points>=3 && points<5) {
            newPasswordStrengthText = "Good"
        }

        if(points == 5) {
            newPasswordStrengthText = "Strong"
        }

        if(event.target.value.length>0)
            this.setState({passwordStrength: ""+(points*20), passwordStrengthText: newPasswordStrengthText})
    }

    obtainClassPasswordStrength(): string {
        if(this.state.passwordStrength<60) {
            return "passWeak"
        }

        if(this.state.passwordStrength<100) {
            return "passGood"
        }

        if(this.state.passwordStrength==100) {
            return "passStrong"
        }
    }

    obtainFieldStep1(): string {
        return `field ${this.state.step=='1' ? 'hidden' : ''}`
    }

    obtainFieldStep2(): string {
        return `field ${this.state.step=='2' ? 'hidden' : ''}`
    }

    obtainUsernameClass(): string {
        return `input ${this.state.formError=='username' ? 'is-danger' : ''}`
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { username, email, password, confirmPassword, showPassword, showCPassword, formError, step, code, passwordStrength, passwordStrengthText } = this.state
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
                                <div className={this.obtainFieldStep2()}>
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["usuario"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={username} className={this.obtainUsernameClass()} type="text" autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                    { formError=='username' && CustomErrorMessage(msgError) }
                                </div>
                                <div className={this.obtainFieldStep2()}>
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
                                <div className={this.obtainFieldStep2()}>
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["pass"]}
                                    </label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input onInput={(e) => {this.loadPasswordStrength(e)}} v-model={password} className={`input inputpass fas ${formError=='password' ? 'is-danger' : ''}`} type={showPassword ? "text" : "password"} autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i onMouseUp={(e) => {e.preventDefault()}} onMouseDown={(e) => {e.preventDefault()}} className={`showpass fas fa-eye${showPassword ? '' : '-slash'}`} onClick={showPass.bind(this)}></i>
                                        </span>
                                        {passwordStrengthMeter(passwordStrength)}
                                        <div className={`passwordStrengthText ${this.obtainClassPasswordStrength()}`}>{passwordStrengthText}</div>
                                    </div>
                                    { formError=='password' && CustomErrorMessage(msgError) }
                                </div>
                                <div className={this.obtainFieldStep2()}>
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
                                <div className={this.obtainFieldStep1()}>
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
                                <div className="field_haveAccount">
                                    <p className="control">
                                        {obtainTextTranslated["explanations"]["have_account2"]}
                                        <Link href="/">
                                            <a>{obtainTextTranslated["explanations"]["login"]}</a>
                                        </Link>
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