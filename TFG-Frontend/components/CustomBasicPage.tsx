import { Component } from 'react'
import cookies from "next-cookies";
import * as langEnglish from '@utils/languages/english.json';
import * as langSpanish from '@utils/languages/spanish.json';

export default class CustomBasicPage extends Component<any, any>{
    static async getInitialProps(ctx: any) {
        return {
            pathname: ctx.pathname,
            initialLanguageSelected: cookies(ctx).languageSelected || 'english',
            username: cookies(ctx).username
        }
    }
    translations: { english: any; spanish: any; };
    constructor(props: any) {
        super(props);

        this.state = {
            languageSelected: props.initialLanguageSelected || "english",
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
            <div></div>
        )
    }
}