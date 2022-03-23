import { Component } from "react";
import logo from "@assets/Logo-TISHOP.png"
import userProfile from "@assets/UserProfile.png"
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';
import Image from 'next/image'
import Router from 'next/router';
import axios from "axios";

export default class Header extends Component<any,any> {
    translations: { english: any; spanish: any; };
    constructor(props: any) {
        super(props);

        this.state = {
            pathname: props.pathname,
            username: props.username || "",
            languageSelected: props.initialLanguageSelected || "english",
            styleNavbarBurger: "navbar-burger",
            styleNavbarMenu: "navbar-menu",
            showNotifications: false,
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

    checkIfIsActive(navName: string): boolean{
        return this.state.pathname === navName
    }

    handleLogout(){
        axios({
            method: 'get',
            url: '/api/users/logout',
            data: {},
        }).then((response) => {
            if(response.status == 200){
                document.cookie = `username="";`;
                Router.push('')
            }
        }, (error) => {
        });
    }

    obtainUserInfo(): string{
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return obtainTextTranslated["explanations"]["hello"] + ", " + this.state.username
    }

    render() {
        const { showNotifications, styleNavbarBurger, styleNavbarMenu } = this.state
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Image width={200} height={60} src={logo} alt="Logo"/>
                    <div className="navbar-item">
                        <div className="languageSelect">
                            <div className="control">
                                <div className="select">
                                    <select className="not-border" onChange={this.handleLanguageChange} value={this.state.languageSelected}>
                                        <option className="not-border" value="english">
                                            English
                                        </option>
                                        <option className="not-border" value="spanish">
                                            Spanish
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a role="button" className={styleNavbarBurger} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={()=>{this.handleNavbarBurger()}}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className={styleNavbarMenu}>
                    <div className="navbar-start">
                        <a className={this.checkIfIsActive("/home") ? "navbar-custom is-active" : "navbar-custom"}>
                            Home
                        </a>
                    </div>
                    <div className="navbar-end">

                        <div className="navbar-item">
                            <span className="customIcon">
                                <i className={`${showNotifications ? 'fas' : 'far'} fa-bell`}></i>
                            </span>
                        </div>
                        <div className="navbar-brand">
                            <Image src={userProfile} width={60} height={60} alt="User Profile"/>
                            <div className="user-info">
                                {this.obtainUserInfo()}
                                <div className="user-logout">
                                    <a onClick={() => {this.handleLogout()}}>
                                        {obtainTextTranslated["buttons"]["logout"]}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
