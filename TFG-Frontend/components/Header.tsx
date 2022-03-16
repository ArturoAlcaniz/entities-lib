import { Component } from "react";
import logo from "@assets/Logo-TISHOP.png"
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';

export default class Header extends Component<any,any> {
    translations: { english: any; spanish: any; };

    constructor(props: any) {
        super(props);

        this.state = {
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
                        <a className="navbar-item">
                            Home
                        </a>
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
                                <a className="button is-primary">
                                    <strong>{obtainTextTranslated["buttons"]["registro"]}</strong>
                                </a>
                                <a className="button is-light">
                                    {obtainTextTranslated["buttons"]["iniciar_sesion"]}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
