import { default as creditors } from '../schemas/creditor';

export default defineEventHandler(async (event) => {
    const headers = getHeaders(event);
    console.log(headers.authorization)
    try {
        const data_to_send = await creditors.find({});
        return data_to_send;
    } catch (e) {
        throw createError({
            statusCode: 400,
            message: 'НИчего не найдено, возможна ошибка с базой данных'
        })
    }


})