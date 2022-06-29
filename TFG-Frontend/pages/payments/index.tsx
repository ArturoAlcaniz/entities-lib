import React from 'react'
import CustomBasicPage from '@components/CustomBasicPage';
import HeaderLogged from '@components/Commons/HeaderLogged';
import { handleBuyCoins } from '@components/Payments/PaymentsLogic';
import CustomErrorMessage from '@utils/CustomErrorMessage';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default class PaymentsPage extends CustomBasicPage{
    headerLogged: any;

    constructor(props: any) {
        super(props);
        this.headerLogged = React.createRef()

        this.state = {
            ...this.state,
            username: this.props.username || "",
            email: this.props.email || "",
            avatar: null,
            componentName: "Buy coins | TI-Shop",
            formError: "",
            coinsToBuy: ""
        }
    }

    render() {

        let languageSelected = this.state.languageSelected
        let obtainTextTranslated = this.translations[languageSelected]
        let msgError = obtainTextTranslated["requestErrors"][this.state.requestErrors.get('paymentsError')]
        let thisComponent = this
        const { coinsToBuy, formError } = this.state

        return (
            <div>
                {super.render()}
                <HeaderLogged ref={this.headerLogged}
                        username={this.props.username}
                        email={this.props.email}
                        coins={this.props.coins}
                        avatar={this.props.avatar}
                        pathname={this.props.pathname} 
                        setLanguageSelected={this.setLanguageSelected} 
                        initialLanguageSelected={languageSelected} />
                <div className="pageCentered">
                    <form>
                        <div className="card buyCoinsForm">
                            <div className="card-content">
                                <div className="field">
                                    <label className="label">
                                        {obtainTextTranslated["labels"]["coins"]}
                                    </label>
                                    <div className="control has-icons-right">
                                        <input className="input" autoComplete='off' type="text" v-model={coinsToBuy}></input>
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-dollar-sign"></i>    
                                        </span>
                                    </div>
                                    { formError=='coins' && CustomErrorMessage(msgError) }
                                </div>
                        
                                <PayPalScriptProvider
                                    options={{
                                        "client-id": "ATybTlAE7_-nAfMs1l_KmQ9xpKakPpQHp0e3Cf4quc4nqNa3UMt0O6EmBdDVZPV-3rbaEFAPz-8sEYas"
                                    }}
                                >
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: this.state.coinsToBuy,
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then(async (details) => {
                                                const name = details.payer.name.given_name;
                                                const id = details.id
                                                alert(await handleBuyCoins(id, thisComponent))
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}