export default function LanguageSelect(thisComponent) {
    return (
        <div className="languageSelect not-border">
            <div className="control">
                <div className="select">
                    <select className="not-border" onChange={thisComponent.handleLanguageChange} value={thisComponent.state.languageSelected}>
                        <option className="not-border" value="english">
                            English
                        </option>
                        <option className="not-border" value="spanish">
                            Español
                        </option>
                    </select>
                </div>
            </div>
        </div>
    )
}