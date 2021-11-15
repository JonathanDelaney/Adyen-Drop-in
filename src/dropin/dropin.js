// 0. Get clientKey
getClientKey().then(clientKey => {
    getPaymentMethods().then(paymentMethodsResponse => {
        // 1. Create an instance of AdyenCheckout
        const checkout = new AdyenCheckout({
            environment: 'test',
            clientKey: clientKey, // Mandatory. clientKey from Customer Area
            paymentMethodsResponse,
            removePaymentMethods: ['paysafecard', 'c_cash'],
            onSubmit: (state, component) => {
                state.data.reference = "JonathanDelaney_adyenrecruitment";
                state.data.returnUrl = "https://docs.adyen.com/";
                state.data.merchantAccount = "AdyenRecruitmentCOM";
                // state.data.additionalData = {RequestedTestAcquirerResponseCode: "Refused"}; // Uncommented to simulate a refused payment
                makePayment(state.data);
            }
        });

        // 2. Create and mount the Component
        const dropin = checkout
            .create('dropin', {
                openFirstPaymentMethod: false,
                openFirstStoredPaymentMethod: false,
                showPaymentMethods: true,
                showStoredPaymentMethods: true,
                showRemovePaymentMethodButton: true,
                showPayButton: true,
            })
            .mount('#dropin-container');
    });
});

var lastScrollTop = 0;
$(window).scroll(function(event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
        console.log("Oi")
        $(".info").hide();
    } else {
        $(".info").hide();
    }
    lastScrollTop = st;
});