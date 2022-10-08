import React from 'react';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import { handleObtainLimitedBy } from '@root/components/Management/ManagementLogic';
import shortid from 'shortid';

export default class CreateCodePage extends CustomBasicPageLogged{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            coins: 0.0,
            numberLimited: Boolean,
            dateLimited: Boolean,
            componentName: "Create code | TI-Shop",
            limitedBy: "",
            limitedByOptions: []
        }
        
        handleObtainLimitedBy(this)
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { coins, limitedBy, limitedByOptions } = this.state
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('createCodeError')]

        return (
            <>
                {super.render()}
                <div className="pageCentered">
                    <div className="card createProductForm">
                        <div className="card-content">
                            <div className="field">
                                <label className="label">
                                    {obtainTextTranslated["labels"]["coins"]}
                                </label>
                                <div className="control">
                                    <input className="input" v-model={coins} type="number" autoComplete="off"></input>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <select className="select" v-model={limitedBy} autoComplete="off">
                                        { this.state.limitedByOptions && this.state.limitedByOptions.length > 0 && this.state.limitedByOptions.map(limited => {
                                            return (
                                                <option key={shortid.generate()} value={limited}>{limited}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="field">

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}