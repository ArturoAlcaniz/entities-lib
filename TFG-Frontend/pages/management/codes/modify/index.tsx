import React from 'react';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';

export default class ModifyCodePage extends CustomBasicPageLogged{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            componentName: "Modify Code | TI-Shop",
        }
    }

    handleGoManageCodes() {

    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return (
            <div>
                {super.render()}
                <div className="pageCentered">
                </div>
            </div>
        )
    }
}