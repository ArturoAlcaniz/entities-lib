import React from 'react';
import CustomBasicPageLogged from '@root/components/CustomBasicPageLogged';
import money from "@assets/money.png";
import Image from 'next/image';
import { handleGoCodesManage } from '@root/components/Management/ManagementLogic';


export default class ManagementPage extends CustomBasicPageLogged{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            componentName: "Management | TI-Shop",
        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        return (
            <div>
                {super.render()}
                <div className="pageCentered">
                    <div className="box clickable" onClick={() => handleGoCodesManage()}>
                        <div className="content">
                            <>
                                <Image 
                                    src={money}
                                    alt="Codes Management"
                                    width={300} 
                                    height={200} 
                                    style={{ width: '300px', height: '200px' }}   
                                />
                            </>
                            <p>
                                <strong>{obtainTextTranslated["buttons"]["codes"]}</strong><br></br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}