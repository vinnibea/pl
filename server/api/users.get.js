import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
    if (!event.context.bot) throw createError({
        statusCode: 400,
        statusMessage: 'Forbidden',
    })
    

    try {
    const users_from_db = await prisma.user.findMany({
        orderBy: {
            id: 'desc',
        },
        take: 10,
    });
    return users_from_db;
    } catch (error) {
        throw createError({
            statusCode: 405,
            message: 'Something with DB',
        })
    }

    
})