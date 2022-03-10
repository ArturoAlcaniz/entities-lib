import { AppPage } from "../utils/CommonPage";
import React, { useState } from 'react'
import { Fragment } from "react";
import axios from "axios";
import languagesView from "../utils/Functions";

class LoginPage extends AppPage{

    email: String
    password: String
    setEmail: any;
    setPassword: any;

    constructor(){
        super();
        [this.email, this.setEmail] = useState("");
        [this.password, this.setPassword] = useState("")
    }
    
    handleLogin = function(page: LoginPage) {
        console.log(page.email);
        console.log(page.password);
        axios({
            method: 'post',
            url: '/api/users/login',
            data: {
                email: page.email,
                pass: page.password
            },
        }).then((response) => {
            if(response.status == 200){
                let lista: Map<string, string> = new Map<string, string>().set("loginOk", response.data.message[0])
                page.setRequestOK(lista);
            }
        }, (error) => {
            let lista: Map<string, string> = new Map<string, string>().set("loginError", error.response.data.message[0])
            page.setRequestErrors(lista);
        });
    }
}

const Index = () => {
    let page = new LoginPage()
    const LanguagesView = () => languagesView(page)

    return (
        <Fragment>
            <LanguagesView />
            <div className="pageCentered">
                <div className="card loginForm">
                    <div className="card-content">
                        <div className="field">
                            <label className="label">
                                {page.translations[page.languageSelected]["labels"]["correo"]}
                            </label>
                            <div className="control has-icons-left">
                                <input onChange={event => page.setEmail(event.target.value)} className="input" type="email" autoComplete="off"></input>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>    
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">
                                {page.translations[page.languageSelected]["labels"]["pass"]}
                            </label>
                            <div className="control has-icons-left">
                                <input onChange={event => page.setPassword(event.target.value)} className="input" type="password" autoComplete="off"></input>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <p className="help is-danger">
                            {page.translations[page.languageSelected]["requestErrors"][page.requestErrors.get('loginError')]}
                        </p>
                        <p className="help is-success">
                            {page.translations[page.languageSelected]["requestOK"][page.requestOK.get('loginOk')]}
                        </p>
                        <div className="field">
                            <p className="control">
                                <button onClick={() => page.handleLogin(page)} className="button">
                                    {page.translations[page.languageSelected]["buttons"]["iniciar_sesion"]}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Index
