import Stripe from 'stripe';
import { default as users } from '../schemas/user';


export default defineEventHandler(async (event) => {
    const stripe = new Stripe(useRuntimeConfig().SSK)
    
    try {
        const body = await readBody(event);
        const un_sub = await stripe.subscriptions.update(
            body._sID,
            { cancel_at_period_end: true }
        );
        const user_from_db = await users.findOneAndUpdate({ _sID: body._sID }, { subscription: false }, {
            new: true,
            upsert: true
        });
        return { message: 'Подписка успешно отменена', action: true }

    } catch (error) {
        throw createError({
            statusCode: 400, 
            message: 'Повторите попытку позже'
        })
    }
})