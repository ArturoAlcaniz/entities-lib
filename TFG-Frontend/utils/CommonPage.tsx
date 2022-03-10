import { useState } from 'react'
import * as langEnglish from './languages/english.json';
import * as langSpanish from './languages/spanish.json';

export class AppPage {
    languageSelected: string;
    setLanguage: any;
    requestErrors: Map<string, string>;
    requestOK: Map<string, string>;
    setRequestErrors: any;
    setRequestOK: any;

    constructor(){
        [this.languageSelected, this.setLanguage] = useState("english");
        [this.requestErrors, this.setRequestErrors] = useState(new Map());
        [this.requestOK, this.setRequestOK] = useState(new Map());
    }

    translations =
        { "english": langEnglish
        , "spanish": langSpanish
        };
}