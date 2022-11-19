export default function ProfileNavbarView(thisComponent) {
    let languageSelected = thisComponent.state.languageSelected
    let obtainTextTranslated = thisComponent.translations[languageSelected]

    return(
        <div tabIndex={0} ref={thisComponent.profileNavbarViewRef} id="ProfileNavbarView" className="box customBoxProfile">
            <div className="profileTitleContainer">
                <p>{thisComponent.obtainUserInfo()}</p>
                <p>{thisComponent.obtainUserCoins()}</p>
            </div>
            <div className="user-info">
                <div className="user-buy-coins">
                    <a onClick={() => {thisComponent.handleGoBuyCoins()}}>
                        {obtainTextTranslated["buttons"]["buy_coins"]}
                    </a>
                </div>                    
                <div className="user-modify">
                    <a onClick={() => {thisComponent.handleAccountConfig()}}>
                        {obtainTextTranslated["buttons"]["account_config"]}
                    </a>
                </div>
                <div tabIndex={-1} className="redeem-code">
                    <a onClick={() => {thisComponent.handleOpenRedeemCode()}}>
                        {obtainTextTranslated["buttons"]["redeem_code"]}
                    </a>
                </div>
                <div className="user-logout">
                    <a data-target="redeem-code-modal">
                        {obtainTextTranslated["buttons"]["logout"]}
                    </a>
                </div>
            </div>
        </div>
    )
}