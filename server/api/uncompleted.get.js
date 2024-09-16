
import prisma from '~/lib/prisma';
export default defineEventHandler(async (event) => {

    if (!event.context._bot) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Forbidden',
        });
    }

    try {
        const uncompleted_from_db = await prisma.uncompleted.findMany();

        return uncompleted_from_db;
    } catch (e) {
        return {
            statusCode: 400,
            message: 'Nothing found',
        }
    }
})