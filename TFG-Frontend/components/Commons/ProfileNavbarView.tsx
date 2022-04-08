export default function ProfileNavbarView(thisComponent) {
    let languageSelected = thisComponent.state.languageSelected
    let obtainTextTranslated = thisComponent.translations[languageSelected]

    return(
        <div tabIndex={0} ref={thisComponent.profileNavbarViewRef} id="ProfileNavbarView" className="box customBoxProfile">
            <div className="profileTitleContainer">
                {thisComponent.obtainUserInfo()}
            </div>
            <div className="user-info">                    
                <div className="user-modify">
                    <a onClick={() => {thisComponent.handleAccountConfig()}}>
                        {obtainTextTranslated["buttons"]["account_config"]}
                    </a>
                </div>
                <div className="user-logout">
                    <a onClick={() => {thisComponent.handleLogout()}}>
                        {obtainTextTranslated["buttons"]["logout"]}
                    </a>
                </div>
            </div>
        </div>
    )
}