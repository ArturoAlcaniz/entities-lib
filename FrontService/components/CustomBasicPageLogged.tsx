import { Component, createRef, RefObject } from 'react'
import cookies from "next-cookies";
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';
import Head from 'next/head';
import HeaderLogged from './Commons/HeaderLogged';
import { handleChangeCode } from './Management/Codes/CodesLogic';
import { handleRedeemCode } from "@components/Management/Codes/CodesLogic"

export default class CustomBasicPageLogged extends Component<any, any>{

    static async getInitialProps(ctx: any): Promise<any> {
        return {
            pathname: ctx.pathname,
            initialLanguageSelected: cookies(ctx).languageSelected || 'english',
            initialUsername: cookies(ctx).username,
            admin: cookies(ctx).admin,
            email: cookies(ctx).email,
            initialCoins: cookies(ctx).coins,
            initialAvatar: cookies(ctx).avatar,
            initialRol: cookies(ctx).rol,
            redeemCodeActive: false,
        }
    }

    translations: { english: any; spanish: any; };
    modalCodeViewRef: RefObject<HTMLDivElement>;
    headerViewRef: any;
    constructor(props: any) {
        super(props);

        this.state = {
            languageSelected: props.initialLanguageSelected || "english",
            componentName: "TI-Shop",
            requestErrors: new Map<string, string>(),
            requestOK: new Map<string, string>(),
            codeRedeem: "",
            coins: props.initialCoins || "",
            username: props.initialUsername || "",
            avatar: props.initialAvatar || "",
            rol: props.initialRol || ""
        }

        this.translations =
        { "english": langEnglish
        , "spanish": langSpanish
        }

        this.setLanguageSelected = this.setLanguageSelected.bind(this)
        this.setRedeemCodeActive = this.setRedeemCodeActive.bind(this)
        this.modalCodeViewRef = createRef();
        this.headerViewRef = createRef();
    }

    setLanguageSelected(languageSelected: string) {
        this.setState({ languageSelected: languageSelected })
        document.cookie = `languageSelected=${languageSelected};`;
    }

    setRedeemCodeActive() {
        this.setState({ redeemCodeActive: true }, () => {
            this.modalCodeViewRef.current.focus();
        });
    }

    blurModalCodeView(event) {
        if (!event?.relatedTarget || !this.modalCodeViewRef.current?.contains(event?.relatedTarget)) {
            this.setState({ redeemCodeActive: false})
        }
    }
    
    render(){

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { redeemCodeActive, codeRedeem, coins, avatar, username } = this.state

        return (
            <div>
                <Head>
                    <title>{this.state.componentName}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <HeaderLogged ref={this.headerViewRef} username={username}
                        admin={this.props.admin}
                        email={this.props.email}
                        coins={coins}
                        pathname={this.props.pathname}
                        avatar={avatar} 
                        setLanguageSelected={this.setLanguageSelected} 
                        setRedeemCodeActive={this.setRedeemCodeActive}
                        initialLanguageSelected={languageSelected} 
                        redeemCodeActive={this.props.redeemCodeActive}/>
                <div id="redeem-code-modal" className={`modal-code ${redeemCodeActive ? '' : 'hidden'}`}>
                    <div className="modal-background"></div>

                    <div tabIndex={-1} ref={this.modalCodeViewRef} onBlur={this.blurModalCodeView.bind(this)} className="modal-content box-redeem-code">
                        <div className="box">
                            <div className="tittle-redeem-code">{obtainTextTranslated["labels"]["code_name"]}</div>
                            <input className="input" value={codeRedeem} onChange={handleChangeCode.bind(this)}></input>
                            <button className="button is-primary" onClick={handleRedeemCode.bind(this)}>{obtainTextTranslated["buttons"]["redeem_code"]}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}