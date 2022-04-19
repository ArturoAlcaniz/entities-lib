import { Component } from 'react'
import cookies from "next-cookies";
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';
import Head from 'next/head';

export default class CustomBasicPage extends Component<any, any>{
    static async getInitialProps(ctx: any) {
        return {
            pathname: ctx.pathname,
            initialLanguageSelected: cookies(ctx).languageSelected || 'english',
            username: cookies(ctx).username,
            email: cookies(ctx).email,
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

        return (
            <div>
                <Head>
                    <title>{this.state.componentName}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
            </div>
        )
    }
}