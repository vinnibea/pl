import { default as emails } from '../schemas/email';

export default defineEventHandler(async (event) => {
    if (!event.context._bot) throw createError({
        statusCode: 400,
        statusMessage: 'Forbidden',
    })
  
    try {
        const emails_from_db = await emails.find({});
        return emails_from_db;
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'DB Error',
        })
    }

  
})