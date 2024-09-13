import jwt from 'jsonwebtoken';

import { default as users } from '../schemas/user';
import { default as subscribers } from '../schemas/email';

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

const mail = (to, message) => ({

  from: '<moneydeal@gmail.com>',

  to: `<${to}>`,

  // Subject of Email
  subject: 'MONEYDEAL',
  html: `<b>Спасибо за подписку</b>`,
  // This would be the text of email body
  text: `${message}`
});



export default defineEventHandler(async (event) => {
  const token = await getCookie(event, 'uid');

  if (token) {
    try {
      const verified_token = jwt.verify(token, useRuntimeConfig().secret);

      event.context.auth = { ...verified_token }
    } catch (error) {
      event.context.auth = false;
    }
  }
})
