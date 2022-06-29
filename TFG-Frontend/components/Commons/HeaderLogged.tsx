import { Component, createRef, RefObject } from "react";
import logo from "@assets/Logo-TISHOP.png"
import userProfile from "@assets/UserProfile.png"
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';
import Image from 'next/image'
import Router from 'next/router';
import axios from "axios";
import NotificationsView from "./NotificationsView";
import ProfileNavbarView from "@components/Commons/ProfileNavbarView";
import LanguageSelect from "./LanguageSelect";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";

export default class HeaderLogged extends Component<any,any> {
    translations: { english: any; spanish: any; };
    notificationViewRef: RefObject<HTMLDivElement>;
    profileNavbarViewRef: RefObject<HTMLDivElement>;
    constructor(props: any) {
        super(props);

        this.state = {
            pathname: props.pathname,
            username: props.username || "",
            email: props.email || "",
            coins: props.coins || "",
            avatar: props.avatar || "",
            languageSelected: props.initialLanguageSelected || "english",
            styleNavbarBurger: "navbar-burger",
            styleNavbarMenu: "navbar-menu",
            showNotifications: false,
            showProfileNavbar: false,
            showLanguageOptions: false,
        }

        this.notificationViewRef = createRef();
        this.profileNavbarViewRef = createRef();

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

    checkIfIsActive(navName: string): boolean{
        return this.state.pathname === navName
    }

    changeCoins(coins) {
        this.setState({coins: coins})
        this.forceUpdate()
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
                    document.cookie = `email="";`;
                    Router.push('')
                }
            }, () => {
                alert("Unexpected error")
            });
        })
    }

    handleAccountConfig(){
        Router.push('profile')
    }

    handleGoBuyCoins(){
        Router.push('payments')
    }

    obtainUserAvatar(): string{
        return this.state.avatar
    }

    obtainUserInfo(): string{
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return obtainTextTranslated["explanations"]["hello"] + ", " + this.state.username
    }

    obtainUserCoins(): string{
        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return this.state.coins + " " + obtainTextTranslated["explanations"]["coins"]
    }

    showNotificationView() {
        this.setState({ showNotifications: !this.state.showNotifications })
    }

    showProfileNavbarView() {
        this.setState({ showProfileNavbar: !this.state.showProfileNavbar })
    }

    blurNotificationView(event) {
        if (!event?.relatedTarget || !this.notificationViewRef.current?.contains(event?.relatedTarget)) {
            this.setState({ showNotifications: false })
        }else{
            event?.currentTarget.focus()
        }
    }

    blurProfileNavbarView(event) {
        if (!event?.relatedTarget || !this.profileNavbarViewRef.current?.contains(event?.relatedTarget)) {
            this.setState({ showProfileNavbar: false})
        }else{
            event?.currentTarget.focus()
        }
    }

    render() {
        const { showProfileNavbar, showNotifications, styleNavbarBurger, styleNavbarMenu } = this.state

        return (
            <div>
                <nav className="navbar navbar-index" role="navigation" aria-label="main navigation">
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
                            <Link href="/buy">
                                <a className={this.checkIfIsActive("/buy") ? "navbar-custom is-active" : "navbar-custom"}>
                                    Buy
                                </a>
                            </Link>
                            <Link href="/sell">
                                <a className={this.checkIfIsActive("/sell") ? "navbar-custom is-active" : "navbar-custom"}>
                                    Sell
                                </a>
                            </Link>
                        </div>
                        <div className="navbar-end">
                            {LanguageSelect(this)}
                            <div className="navbar-item">
                                <span tabIndex={-1} onBlur={this.blurNotificationView.bind(this)} onClick={() => {this.showNotificationView()}} className="customIcon">
                                    <i className={`${showNotifications ? 'fas' : 'far'} fa-bell`}></i>
                                </span>
                            </div>
                            <div className="navbar-brand">
                                <div className={`profile ${showProfileNavbar ? 'profile-active' : ''}`} tabIndex={-1} onBlur={this.blurProfileNavbarView.bind(this)} onClick={() => {this.showProfileNavbarView()}}>
                                    <div className="profile-picture">
                                        <Image src={this.state.avatar ? `/api/users/avatar/${this.state.avatar}` : `/api/users/avatar`} width={60} height={60} alt="User Profile"/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </nav>
                {
                    showNotifications ? NotificationsView(this) : (<div></div>)
                }
                {
                    showProfileNavbar ? ProfileNavbarView(this) : (<div></div>) 
                }
            </div>
        )
    }
}
