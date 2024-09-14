import { default as subscribers } from '../schemas/email';


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const cookie = await getCookie(event, 'subscriber');
    if (cookie) {
        throw createError({ statusCode: 409, statusMessage: 'You are already a subscriber' });
    }
   
    if (!body.email) {
        throw createError({ statusCode: 400, statusMessage: 'Неправильное значение электронной почты, повторите попытку' });
    } else {
        const active_subscriber = await subscribers.findOne({ email: body.email });

        if (active_subscriber) {
            throw createError({ statusCode: 409, statusMessage: 'You are already a subscriber' });
        } 
       
        if (!active_subscriber) {
            setCookie(event, 'subscriber', JSON.stringify({ status: true, email: body.email }));
            return {
                status: true,
                email: body.email,
            }
        }
    }

    try {
        await subscribers.create({ email: body.email });
        setCookie(event, 'subscriber', JSON.stringify({ status: true, email: body.email }));
        return {
            status: true,
            email: body.email,
        }
    } catch (error) {
        throw createError({
            ...error,
            statusMessage: 'Неверный формат электронной почты',
            message: 'Повторите попытку'
        })
    }
})