import React from 'react'
import axios from "axios";
import CustomBasicPage from '@components/CustomBasicPage';
import Router from 'next/router';
import Header from '@components/Header';

export default class RegisterPage extends CustomBasicPage{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }
    
    handleRegister(event: any) {
        event.preventDefault()
        if(this.state.password != this.state.confirmPassword) {
            let lista: Map<string, string> = new Map<string, string>().set("registerError", "confirm_password_not_equals")
            this.setState({ requestErrors: lista, requestOK: new Map<string, string>()});
            this.setState({ password: "", confirmPassword: ""})
            return
        }
        axios({
            method: 'post',
            url: '/api/users/register',
            data: {
                username: this.state.username,
                email: this.state.email,
                pass: this.state.password
            },
        }).then((response) => {
            if(response.status == 200){
                let lista: Map<string, string> = new Map<string, string>().set("registerOk", response.data.message[0])
                this.setState({requestOK: lista, requestErrors: new Map<string, string>()});
            }
        }, (error) => {
            let lista: Map<string, string> = new Map<string, string>().set("registerError", error.response.data.message[0])
            this.setState({ requestErrors: lista, requestOK: new Map<string, string>()});
        });
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { username, email, password, confirmPassword } = this.state

        return (
            <div>
                {super.render()}
                <Header setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} 
                        pathname={this.props.pathname} />
                <div className="pageCentered">
                    <form onSubmit={this.handleRegister.bind(this)} >
                        <div className="card registerForm">
                            <div className="card-content">
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["usuario"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={username} className="input" type="text" autoComplete="off" required></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["correo"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={email} className="input" type="email" autoComplete="off" required></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>    
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["pass"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={password} className="input" type="password" autoComplete="off" required></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["confirm_pass"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={confirmPassword} className="input" type="password" autoComplete="off" required></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <p className="help is-danger">
                                    {obtainTextTranslated["requestErrors"][this.state.requestErrors.get('registerError')]}
                                </p>
                                <p className="help is-success">
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