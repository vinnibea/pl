import { stripe } from '../utils/stripe';

export default defineEventHandler(async (event) => {
    const { sid, cus, pm } = await readBody(event);
    if(!pm) {
        throw createError({
            statusCode: 402,
            message: 'Попробуйте ввести данные другой карты',
            statusMessage: 'Попробуйте ввести данные другой карты'
        })
    }
    try {
        const attachedCustomer = await stripe.paymentMethods.attach(
            pm,
            { customer: cus }  // Ідентифікатор вашого клієнта
        );
        const updatedCustomer = await stripe.customers.update(cus, {
            invoice_settings: {
                default_payment_method: pm,
            }});


      const updatedSubscription = await stripe.subscriptions.update(sid, {
        payment_behavior: 'allow_incomplete',
      })

      return {
        status: 'ok',
      }
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 403,
            statusMessage: 'Попробуйте ввести данные другой карты'
        })
    }
})