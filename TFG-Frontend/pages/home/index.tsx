import React from 'react'
import axios from "axios";
import CustomBasicPage from '@components/CustomBasicPage';
import Header from '@components/HeaderLogged';

export default class LoginPage extends CustomBasicPage{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state
        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return (
            <div>
                {super.render()}
                <Header pathname={this.props.pathname} setLanguageSelected={this.setLanguageSelected} initialLanguageSelected={languageSelected} />
                <div className="pageCentered">
                    
                </div>
            </div>
        )
    }
}