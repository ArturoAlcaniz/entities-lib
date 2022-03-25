import { Component, createRef, RefObject } from "react";
import logo from "@assets/Logo-TISHOP.png"
import userProfile from "@assets/UserProfile.png"
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';
import Image from 'next/image'
import Router from 'next/router';
import axios from "axios";
import NotificationsView from "./NotificationsView";
import LanguageSelect from "./LanguageSelect";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "@root/firebase-config";

export default class Header extends Component<any,any> {
    translations: { english: any; spanish: any; };
    notificationViewRef: RefObject<HTMLDivElement>;
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

        this.notificationViewRef = createRef();

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
        const auth = getAuth()
        signOut(auth).then(() => {
            axios({
                method: 'get',
                url: '/api/users/logout',
                data: {},
            }).then((response) => {
                if(response.status == 200){
                    localStorage.clear()
                    document.cookie = `username="";`;
                    Router.push('')
                }
            }, (error) => {
            });
        })
    }

    obtainUserInfo(): string{
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return obtainTextTranslated["explanations"]["hello"] + ", " + this.state.username
    }

    showNotificationView() {
        this.setState({ showNotifications: !this.state.showNotifications })
    }

    blurNotificationView(event) {
        if (!event?.relatedTarget || !this.notificationViewRef.current?.contains(event?.relatedTarget)) {
            this.setState({ showNotifications: false })
        }else{
            event?.currentTarget.focus()
        }
    }

    render() {
        const { showNotifications, styleNavbarBurger, styleNavbarMenu, notificationsViewRef } = this.state
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return (
            <div>
                <nav className="navbar navbar-index" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Image width={200} height={60} src={logo} alt="Logo"/>
                        <div className="navbar-item">
                            {LanguageSelect(this)}
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
                                <span tabIndex={-1} onBlur={this.blurNotificationView.bind(this)} onClick={() => {this.showNotificationView()}} className="customIcon">
                                    <i className={`${showNotifications ? 'fas' : 'far'} fa-bell`}></i>
                                </span>
                            </div>
                            <div className="navbar-brand">
                                <div className="profile-picture">
                                    <Image src={userProfile} width={60} height={60} alt="User Profile"/>
                                </div>
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
                {
                    showNotifications ? NotificationsView(this, notificationsViewRef) : (<div></div>) 
                }
            </div>
        )
    }
}
