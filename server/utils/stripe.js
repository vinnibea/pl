import Stripe from 'stripe';
const stripe = new Stripe(useRuntimeConfig().SSK)

export {stripe}