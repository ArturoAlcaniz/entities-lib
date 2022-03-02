import { AppPage } from "./CommonPage"

const languagesView = function(page: AppPage) {
    return (
        <div className="languageSelect">
            <div className="control">
                <div className="select">
                    <select>
                        <option onClick={() => page.setLanguage("english")} selected={page.languageSelected == "english"}>
                            &#x1F1FA;&#x1F1F8; English
                        </option>
                        <option onClick={() => page.setLanguage("spanish")} selected={page.languageSelected == "spanish"}>
                            &#x1F1EA;&#x1F1F8; Spanish
                        </option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default languagesView