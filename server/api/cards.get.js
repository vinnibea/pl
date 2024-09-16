import { prisma } from "~/server/prisma"
export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
   
    if (!event.context.bot) throw createError({
        statusCode: 400,
        statusMessage: 'Forbidden',
    })



    try {
        const data_to_send = await prisma.creditor.findMany({
            include: {
                blocks: true,
            }
        });
        return data_to_send;
    } catch (e) {
        throw createError({
            statusCode: 400,
            message: 'НИчего не найдено, возможна ошибка с базой данных'
        })
    }
})