import { prisma } from "~/server/prisma"
export default defineEventHandler(async (event) => {
    if (!event.context._bot) throw createError({
        statusCode: 400,
        statusMessage: 'Forbidden',
    })
  
    try {
        const emails_from_db = await prisma.email.findMany();
        return emails_from_db;
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'DB Error',
        })
    }

  
})