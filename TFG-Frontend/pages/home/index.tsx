import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import HeaderLogged from '@components/Commons/HeaderLogged';

export default class HomePage extends CustomBasicPage{
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
                <HeaderLogged username={this.props.username}
                        email={this.props.email}
                        pathname={this.props.pathname} 
                        setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} />
                <div className="pageCentered">
                    
                </div>
            </div>
        )
    }
}