import Stripe from 'stripe';
import { default as users } from '../schemas/user';
import jwt from 'jsonwebtoken';
import { default as dto } from '../utils/dto';

export default defineEventHandler(async (event) => {
    const secret = useRuntimeConfig().secret;
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
      
        const user_dto = dto.user_to_dto(user_from_db);
     
        const token = jwt.sign(
            user_dto, secret, { expiresIn: '2h' });
        setCookie(event, 'uid', token, { httpOnly: true, maxAge: 60 * 60 * 2 });
        return user_dto;

    } catch (error) {
        console.log(error)
        throw createError({
            statusCode: 400,
            message: 'Повторите попытку позже или напишите письмо, кликнув по кнопке ниже'
        })
    }
})