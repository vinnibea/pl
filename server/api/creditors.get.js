import { default as Creditors } from '../schemas/creditor';

export default defineEventHandler(async (event) => {
    const from_registration = await getCookie(event, 'fr');
    if (from_registration) {
        try {
            const creditors_from_db = await Creditors.find({});
            return creditors_from_db;
        } catch (error) {
            throw createError({
                statusCode: 401,
            })
        }
    }
    if (!event.context.auth) {
        throw createError({
            statusCode: 401,
        })
    }

    try {
        const creditors_from_db = await Creditors.find({});
        return creditors_from_db;
    } catch (error) {
        throw createError({
            statusCode: 401,
        })
    }
})