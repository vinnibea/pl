import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import { default as dto } from '../utils/dto';
import prisma from "~/lib/prisma"
export default defineEventHandler(async (event) => {
    const secret = useRuntimeConfig().secret;
    const stripe = new Stripe(useRuntimeConfig().SSK)

    try {
        const body = await readBody(event);
        console.log(body.sid, 'sid')
        const un_sub = await stripe.subscriptions.update(
            body.sid,
            { cancel_at_period_end: true }
        );

        console.log(un_sub)

        const user_from_db = await prisma.user.update({
            where: {
                phone: body.phone
            },
            data: {
                subscription: false,
            }
        })

        const user_dto = dto.user_to_dto(user_from_db);
        console.log(user_dto, 'dto')
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