export default function NotificationsView(thisComponent, notificationsViewRef) {
    let languageSelected = thisComponent.state.languageSelected
    let obtainTextTranslated = thisComponent.translations[languageSelected]

    return(
        <div tabIndex={0} ref={thisComponent.notificationViewRef} id="NotificationsView" className="box customBox">
            <div className="notificationTitleContainer">
                <div className="notificationTitle">{obtainTextTranslated["titles"]["notificaciones"]}</div>
            </div>
        </div>
    )
}