import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
const stripe = new Stripe(useRuntimeConfig().SSK)
export default defineEventHandler(async(event) => {
   try {
    const {email} = await readBody(event);
    const customer = await stripe.customers.create({
        email,
    }); 
       // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const creation_token = jwt.sign(customer.id, useRuntimeConfig().secret);

    await setCookie(event, '_cid', creation_token, {httpOnly: true, maxAge: 60 * 60 * 24});
    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          price: useRuntimeConfig().price,
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });
      
      
      return ({
        subscription_id: subscription.id,
        secret: subscription.latest_invoice.payment_intent.client_secret,
      });
   } catch (error) {
      throw createError({
        statusCode: 400,
        message: 'Can`t be empty'
      })
   } 
})