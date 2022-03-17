import React from 'react'
import axios from "axios";
import CustomBasicPage from '@components/CustomBasicPage';
import Header from '@components/Header';
import Router from 'next/router';

export default class LoginPage extends CustomBasicPage{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            email: "",
            password: "",
        }
    }
    
    handleLogin(event: any) {
        event.preventDefault()
        axios({
            method: 'post',
            url: '/api/users/login',
            data: {
                email: this.state.email,
                pass: this.state.password
            },
        }).then((response) => {
            if(response.status == 200){
                let lista: Map<string, string> = new Map<string, string>().set("loginOk", response.data.message[0])
                this.setState({requestOK: lista, requestErrors: new Map<string, string>()});   
                setTimeout(() => {
                    Router.push('home')
                },1000)
            }
        }, (error) => {
            let lista: Map<string, string> = new Map<string, string>().set("loginError", error.response.data.message[0])
            this.setState({ requestErrors: lista, requestOK: new Map<string, string>()});
        });
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { email, password } = this.state

        return (
            <div>
                {super.render()}
                <Header setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} 
                        pathname={this.props.pathname} />
                <div className="pageCentered">
                    <form onSubmit={this.handleLogin.bind(this)} >
                        <div className="card loginForm">
                            <div className="card-content">
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["correo"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={email} className="input" type="email" autoComplete="off"></input>
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
                                        <input v-model={password} className="input" type="password" autoComplete="off"></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <p className="help is-danger">
                                    {obtainTextTranslated["requestErrors"][this.state.requestErrors.get('loginError')]}
                                </p>
                                <p className="help is-success">
                                    {obtainTextTranslated["requestOK"][this.state.requestOK.get('loginOk')]}
                                </p>
                                <div className="field">
                                    <p className="control">
                                        <button className="button">
                                            {obtainTextTranslated["buttons"]["login"]}
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