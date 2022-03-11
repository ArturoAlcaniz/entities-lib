import { Component } from "react";

export default class LanguageSelect extends Component<any,any> {

    constructor(props: any) {
        super(props);

        this.state = {
            languageSelected: props.initialLanguageSelected || "english"
        }
    }

    handleLanguageChange = (event: any) => {
        const newLanguage = event.target.value
        this.setState({ languageSelected: newLanguage })
        this.props.setLanguageSelected(newLanguage)
    }

    render() {
        return (
            <div className="languageSelect">
                <div className="control">
                    <div className="select">
                        <select onChange={this.handleLanguageChange} value={this.state.languageSelected}>
                            <option value="english">
                                &#x1F1FA;&#x1F1F8; English
                            </option>
                            <option value="spanish">
                                &#x1F1EA;&#x1F1F8; Spanish
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}
