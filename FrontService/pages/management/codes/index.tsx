import React from 'react';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import { handleGoCreateCodes, handleObtainAllCodes } from '@root/components/Management/Codes/CodesLogic';
import Link from 'next/link';

export default class CodesManagePage extends CustomBasicPageLogged{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            componentName: "Codes Manage | TI-Shop",
            codes: [],
        }

        handleObtainAllCodes(this).catch(e => console.log("Failed to get codes", e));
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return (
            <div>
                {super.render()}
                <div className='buttonCentered'>
                    <Link href="/management/codes/create">
                        <button className="button is-primary">{obtainTextTranslated["buttons"]["create_code"]}</button>
                    </Link>
                </div>
                <div className="pageCentered">
                    <div className="ListCodes">
                        <table className="table">
                            <thead>
                                <th>{obtainTextTranslated["labels"]["code_name"]}</th>
                                <th>{obtainTextTranslated["labels"]["coins"]}</th>
                                <th>{obtainTextTranslated["labels"]["start_code"]}</th>
                                <th>{obtainTextTranslated["labels"]["end_code"]}</th>
                                <th>{obtainTextTranslated["labels"]["amount"]}</th>
                            </thead>
                            <tbody>
                                {this.state.codes && this.state.codes.length>0 && this.state.codes.map(code => {
                                    return (
                                        <tr key={code.ID}>
                                            <th>{code.ID}</th>
                                            <td>{code.COINS}</td>
                                            <td>{code.STARTS}</td>
                                            <td>{code.ENDS}</td>
                                            <td>{code.AMOUNT}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}