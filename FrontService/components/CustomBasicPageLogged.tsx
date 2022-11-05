import { Component } from 'react'
import cookies from "next-cookies";
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';
import Head from 'next/head';
import HeaderLogged from './Commons/HeaderLogged';

export default class CustomBasicPageLogged extends Component<any, any>{

    static async getInitialProps(ctx: any): Promise<any> {
        return {
            pathname: ctx.pathname,
            initialLanguageSelected: cookies(ctx).languageSelected || 'english',
            username: cookies(ctx).username,
            admin: cookies(ctx).admin,
            email: cookies(ctx).email,
            coins: cookies(ctx).coins,
            avatar: cookies(ctx).avatar,
        }
    }
    translations: { english: any; spanish: any; };
    constructor(props: any) {
        super(props);

        this.state = {
            languageSelected: props.initialLanguageSelected || "english",
            componentName: "TI-Shop",
            requestErrors: new Map<string, string>(),
            requestOK: new Map<string, string>()
        }

        this.translations =
        { "english": langEnglish
        , "spanish": langSpanish
        }

        this.setLanguageSelected = this.setLanguageSelected.bind(this)
    }

    setLanguageSelected(languageSelected: string) {
        this.setState({ languageSelected: languageSelected })
        document.cookie = `languageSelected=${languageSelected};`;
    }

    render(){

        let languageSelected = this.state.languageSelected

        return (
            <div>
                <Head>
                    <title>{this.state.componentName}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <HeaderLogged username={this.props.username}
                        admin={this.props.admin}
                        email={this.props.email}
                        coins={this.props.coins}
                        pathname={this.props.pathname}
                        avatar={this.props.avatar} 
                        setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} />
            </div>
        )
    }
}