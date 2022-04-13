import Image from 'next/image'
import ESImage from "@assets/es.png";
import USImage from "@assets/us.png";

function obtainLanguageImage(thisComponent): JSX.Element {
    if(thisComponent.state.languageSelected == "spanish")
        return (<Image width={32} height={24} src={ESImage} alt="ES Flag" />);

    return (<Image width={32} height={24} src={USImage} alt="US Flag" />);
}

function blurLanguageSelect(thisComponent) {
    thisComponent.setState({showLanguageOptions: false})
}

function showLanguageOptions(thisComponent) {
    thisComponent.setState({showLanguageOptions: !thisComponent.state.showLanguageOptions})
}

export default function LanguageSelect(thisComponent): JSX.Element {
    return (
        <div className="navbar-item">
            <div tabIndex={-1} onBlur={() => {blurLanguageSelect(thisComponent)}} className="customSelectLanguage" onClick={() => {showLanguageOptions(thisComponent)}}>
                <div className="customSelectaLanguageText">
                    { obtainLanguageImage(thisComponent) }
                    <i className="fas fa-caret-down"></i>
                </div>
                <div className={`customBoxLanguage ${thisComponent.state.showLanguageOptions ? '' : 'hidden'}`}>
                    <div className="optionLanguage" onClick={() => {thisComponent.setState({languageSelected: "english"})}}>
                        <Image width={32} height={24} src={USImage} alt="US Flag" />
                    </div>
                    <div className="optionLanguage" onClick={() => {thisComponent.setState({languageSelected: "spanish"})}}>
                        <Image width={32} height={24} src={ESImage} alt="ES Flag" />
                    </div>
                </div>
            </div>
        </div>
    )
}