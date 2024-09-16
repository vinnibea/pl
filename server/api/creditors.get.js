import { prisma } from "~/server/prisma"
export default defineEventHandler(async (event) => {
    try {
        const creditors_from_db = await prisma.creditor.findMany({
            include: {
              blocks: true,
            }
        })
        return creditors_from_db;
    } catch (error) {
        console.log(error)
        throw createError({
            statusCode: 404,
        })
    }
})