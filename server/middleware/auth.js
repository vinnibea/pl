import jwt from 'jsonwebtoken';
import { Telegraf } from 'telegraf';
import { default as users } from '../schemas/user';
import { default as subscribers } from '../schemas/subscribe';
import nodemailer from 'nodemailer';

const bot = new Telegraf(useRuntimeConfig().bot);

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

bot.on('message', async (ctx) => {
  if (ctx.update.message.chat.username !== 'ntdmthfckrs') {
    return await ctx.reply('Permission denied, ask @felix_the_creator for Permission')
  }
  
  switch (ctx.update.message.text.toLowerCase()) {
    case 'логи': {
      await log.read(ctx);
      break;
    }
    case 'юзеры': {
      const user_to_send = await users.find({});
      user_to_send.forEach(async (user) => {
        await ctx.reply(`${user.email}`);
      });


      break;
    }

    case 'эмейлы': {
      const subs = await subscribers.find({});
      subs.forEach(async (s) => {
        await ctx.reply(`${s.email}`);
      });

      break;
    }

    case 'отправить': {
      await ctx.reply('todo')
     break;
    }

    default: {
      await ctx.reply(`Команда не найдена. \nСписок команд: \n- логи \n- юзеры \n- эмейлы \n- отправить`);
    }
  }

})

bot.launch()
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
