import {stripe} from '../utils/stripe';

export default defineEventHandler(async(event) => {
    const { email} = await readBody(event);
    const customer = await stripe.customers.create({
      email,
    });

    const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
      });

    return {secret: setupIntent.client_secret, customerID: customer.id}
})