import prisma from '~/lib/prisma';
export default defineEventHandler(async (event) => {
    const headers = await getRequestHeaders(event)
    const query = await getQuery(event);
    console.log(query)
    const page = parseInt((query && query.page) || '1', 10);
    const pageSize = 5;
    if (!event.context.bot) throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
    })
    try {
        const creditors_count = await prisma.creditor.count();
        const hasPreviousPage = page > 1 ? true : false;
        const hasNextPage = (page * pageSize) < creditors_count ? true : false;
        const data_to_send = await prisma.creditor.findMany({
            omit: {
                blocks: true,
                createdAt: true,
                updatedAt: true,
                src: true
            },
            take: pageSize,
            skip: (page - 1) * pageSize,
        });
        const payload = {
            prev: hasPreviousPage,
            next: hasNextPage,
            data: data_to_send,
        }
        return { payload };
    } catch (e) {
        throw createError({
            statusCode: 400,
            message: 'НИчего не найдено, возможна ошибка с базой данных'
        })
    }
})