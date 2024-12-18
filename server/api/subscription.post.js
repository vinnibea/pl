import Stripe from 'stripe';

const stripe = new Stripe(useRuntimeConfig().SSK)
export default defineEventHandler(async (event) => {
    const { email, token, product } = await readBody(event);
    const returnURL = await getRequestURL(event)

    console.log(product, email)
    const customer = await stripe.customers.create({
        source: token,
        email: email
    })

    const session = await stripe.subscriptions.create({
        mode: 'subscription',
        customer: customer.id,
        line_items: [
            {
                price: 'price_1PvrIPIrN43O4aCG1T6BuFZr',
                quantity: 1,

            }],
        success_url: returnURL.origin,
    })

    return {
        status: 'OK',
    }
})