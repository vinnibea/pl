import Stripe from 'stripe';
import { default as users } from '../schemas/user';


export default defineEventHandler(async (event) => {
    const stripe = new Stripe(useRuntimeConfig().SSK)
    
    try {
        const body = await readBody(event);
        const un_sub = await stripe.subscriptions.update(
            body.sid,
            { cancel_at_period_end: true }
        );



        const user_from_db = await users.findOneAndUpdate({ phone: body.phone }, { subscription: false }, {
            new: true,
            upsert: true
        });
        console.log(user_from_db)
        return user_from_db;

    } catch (error) {
        throw createError({
            statusCode: 400, 
            message: 'Повторите попытку позже или напишите письмо, кликнув по кнопке ниже'
        })
    }
})