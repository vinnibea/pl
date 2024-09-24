
import jwt from 'jsonwebtoken';
import { stripe } from '../utils/stripe';
export default defineEventHandler(async (event) => {
  try {
    const { customerID, price } = await readBody(event);
  
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const creation_token = jwt.sign(customerID, useRuntimeConfig().secret);

    await setCookie(event, '_cid', creation_token, { httpOnly: true, maxAge: 60 * 60 * 24 });
    const subscription = await stripe.subscriptions.create({
      customer: customerID,
      items: [{
        price,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
      trial_end: Math.floor(Date.now() / 1000) + 432000
    });
    return (
      {
        subscription_id: subscription.id,
        secret: subscription.pending_setup_intent.client_secret,
        type: 'setup',

      }
    )

  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 400,
      message: 'Can`t be empty'
    })
  }
})