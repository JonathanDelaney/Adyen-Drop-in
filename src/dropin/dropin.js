// 0. Get clientKey
getClientKey().then(clientKey => {
    getPaymentMethods().then(paymentMethodsResponse => {
        // 1. Create an instance of AdyenCheckout
        const checkout = new AdyenCheckout({
            environment: 'test',
            clientKey: clientKey, // Mandatory. clientKey from Customer Area
            paymentMethodsResponse,
            removePaymentMethods: ['paysafecard', 'c_cash'],
            onChange: state => {
                updateStateContainer(state); // Demo purposes only
            },
            onSubmit: (state, component) => {
                state.data.reference = "JonathanDelaney_adyenrecruitment";
                state.data.returnUrl = "https://docs.adyen.com/";
                state.data.merchantAccount = "AdyenRecruitmentCOM";
                state.data.additionalData = {RequestedTestAcquirerResponseCode: "Refused"};
                // state.data;
                // state.isValid;
                makePayment(state.data);
            }
        });

        // 2. Create and mount the Component
        const dropin = checkout
            .create('dropin', {
                openFirstPaymentMethod: false,
                // Events
                onSelect: activeComponent => {
                    if (activeComponent.state && activeComponent.state.data) updateStateContainer(activeComponent.data); // Demo purposes only
                }
            })
            .mount('#dropin-container');
    });
});
