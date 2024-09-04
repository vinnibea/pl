import { default as subscribers } from '../schemas/subscribe';
import nodemailer from 'nodemailer';

const appPassword = 'qolv wtwa aadb lxeg';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'vinnibea3@gmail.com',
        pass: appPassword,
    }
});

const mail = (to) => ({

    from: '<moneydeal@gmail.com>',

    to: `<${to}>`,

    // Subject of Email
    subject: 'MONEYDEAL',
    html: '<b>Спасибо за подписку</b>',
    // This would be the text of email body
    text: 'Спасибо за подписку.'
});

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
            setCookie(event, 'subscriber', JSON.stringify({ status: true, email: body.email }));
            return {
                status: true,
                email: body.email,
            }
        }
    }

    try {
        await subscribers.create({ email: body.email });
        transporter.sendMail(mail(body.email), (err, info) => {
            if (err) {
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
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