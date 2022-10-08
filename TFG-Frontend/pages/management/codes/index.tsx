import React from 'react';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import { handleGoCreateCodes } from '@root/components/Management/Codes/CodesLogic';

export default class CodesManagePage extends CustomBasicPageLogged{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            componentName: "Codes Manage | TI-Shop",
        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return (
            <div>
                {super.render()}
                <div className="pageCentered">
                    <button className='button' onClick={() => {handleGoCreateCodes()}}>{obtainTextTranslated["buttons"]["create_code"]}</button>
                </div>
            </div>
        )
    }
}