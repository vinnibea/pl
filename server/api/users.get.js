import { default as users } from '../schemas/user';

export default defineEventHandler(async (event) => {
    if (!event.context._bot) throw createError({
        statusCode: 400,
        statusMessage: 'Forbidden',
    })
    

    try {
    const users_from_db = await users.find({});
    return users_from_db;
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: 'Something with DB',
        })
    }

    
})