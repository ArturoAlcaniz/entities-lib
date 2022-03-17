import { Component } from "react";
import logo from "@assets/Logo-TISHOP.png"
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';
import Router from 'next/router';

export default class Header extends Component<any,any> {
    translations: { english: any; spanish: any; };

    constructor(props: any) {
        super(props);

        this.state = {
            pathname: props.pathname,
            languageSelected: props.initialLanguageSelected || "english",
            styleNavbarBurger: "navbar-burger",
            styleNavbarMenu: "navbar-menu"
        }

        this.translations =
        { "english": langEnglish
        , "spanish": langSpanish
        }
    }

    handleLanguageChange = (event: any) => {
        const newLanguage = event.target.value
        this.setState({ languageSelected: newLanguage })
        this.props.setLanguageSelected(newLanguage)
    }

    handleNavbarBurger() {
        if(this.state.styleNavbarBurger == "navbar-burger") {
            this.setState({ styleNavbarBurger: "navbar-burger is-active", styleNavbarMenu: "navbar-menu is-active" })
        }else{
            this.setState({ styleNavbarBurger: "navbar-burger", styleNavbarMenu: "navbar-menu" })
        }
    }

    handleGoRegister() {
        Router.push('register')
    }

    handleGoLogin() {
        Router.push('/')
    }

    obtainButtonRegister(): JSX.Element {
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        return (
        <a className="button is-primary" onClick={() => {this.handleGoRegister()}}>
            <strong>{obtainTextTranslated["buttons"]["registro"]}</strong>
        </a>)
    }

    obtainButtonLogin(): JSX.Element {
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        return (
        <a className="button is-primary" onClick={() => {this.handleGoLogin()}}>
            <strong>{obtainTextTranslated["buttons"]["login"]}</strong>
        </a>)
    }

    obtainButtons(): JSX.Element {
        let pathname = this.state.pathname
        console.log(pathname)
        if(pathname == "/"){
            return this.obtainButtonRegister()
        }else{
            if(pathname == "/register"){
                return this.obtainButtonLogin()
            }
        }
    }

    render() {
        const { styleNavbarBurger, styleNavbarMenu } = this.state
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]


        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <img src={logo} width="200" height="60" alt="Logo"/>

                    <a role="button" className={styleNavbarBurger} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={()=>{this.handleNavbarBurger()}}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className={styleNavbarMenu}>
                    <div className="navbar-start">
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="languageSelect">
                                <div className="control">
                                    <div className="select">
                                        <select onChange={this.handleLanguageChange} value={this.state.languageSelected}>
                                            <option value="english">
                                                English
                                            </option>
                                            <option value="spanish">
                                                Spanish
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons">
                                { this.obtainButtons() }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
