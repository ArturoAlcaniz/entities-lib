import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import Header from '@components/Commons/Header';
import handleRegister from '@components/Register/RegisterLogic';

export default class RegisterPage extends CustomBasicPage{
    constructor(props: any) {
        super(props);

        this.state = {
            ...this.state,
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]

        const { username, email, password, confirmPassword } = this.state

        return (
            <div>
                {super.render()}
                <Header setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} 
                        pathname={this.props.pathname} />
                <div className="pageCentered">
                    <form onSubmit={handleRegister.bind(this)} >
                        <div className="card registerForm">
                            <div className="card-content">
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["usuario"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={username} className="input" type="text" autoComplete="off" required></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["correo"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={email} className="input" type="email" autoComplete="off" required></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>    
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["pass"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={password} className="input" type="password" autoComplete="off" required></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["confirm_pass"]}
                                    </label>
                                    <div className="control has-icons-left">
                                        <input v-model={confirmPassword} className="input" type="password" autoComplete="off" required></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <p className="help is-danger">
                                    {obtainTextTranslated["requestErrors"][this.state.requestErrors.get('registerError')]}
                                </p>
                                <p className="help is-success">
                                    {obtainTextTranslated["requestOK"][this.state.requestOK.get('registerOk')]}
                                </p>
                                <div className="field">
                                    <p className="control">
                                        <button className="button">
                                            {obtainTextTranslated["buttons"]["registro"]}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}