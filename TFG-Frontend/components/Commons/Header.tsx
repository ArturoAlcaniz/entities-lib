import { Component } from "react";
import logo from "@assets/Logo-TISHOP.png"
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';
import Image from 'next/image'
import Router from 'next/router';
import LanguageSelect from "./LanguageSelect";

export default class Header extends Component<any,any> {
    translations: { english: any; spanish: any; };

    constructor(props: any) {
        super(props);

        this.state = {
            pathname: props.pathname,
            languageSelected: props.initialLanguageSelected || "english",
            styleNavbarBurger: "navbar-burger",
            styleNavbarMenu: "navbar-menu",
            showLanguageOptions: false,
        }

        this.translations =
        { "english": langEnglish
        , "spanish": langSpanish
        }
    }

    handleNavbarBurger() {
        if(this.state.styleNavbarBurger == "navbar-burger") {
            this.setState({ styleNavbarBurger: "navbar-burger is-active", styleNavbarMenu: "navbar-menu is-active" })
        }else{
            this.setState({ styleNavbarBurger: "navbar-burger", styleNavbarMenu: "navbar-menu" })
        }
    }

    render() {
        const { styleNavbarBurger, styleNavbarMenu } = this.state
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Image width={200} height={60} src={logo} alt="Logo"/>
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
                        {LanguageSelect(this)}
                        <div className="navbar-item">
                            <div className="buttonLogin" onClick={() => {Router.push('login')}}>
                                <div className="loginText">{obtainTextTranslated["buttons"]["login"]}</div>
                            </div>
                        </div>
                        <div className="navbar-item">
                            <a className="button is-primary buttonRegister" onClick={() => {Router.push('register')}}>
                                <strong>{obtainTextTranslated["buttons"]["registro"]}</strong>
                            </a>
                        </div>
                    </div>
                </div>
                
            </nav>
        )
    }
}
