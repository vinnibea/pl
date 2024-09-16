import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
    if (!event.context._bot) throw createError({
        statusCode: 400,
        statusMessage: 'Forbidden',
    })
    

    try {
    const users_from_db = await prisma.user.findMany();
    return users_from_db;
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: 'Something with DB',
        })
    }

    
})