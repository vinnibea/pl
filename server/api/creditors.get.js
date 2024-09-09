import { default as Creditors } from '../schemas/creditor';

export default defineEventHandler(async (event) => {
    try {
        const creditors_from_db = await Creditors.find({});
        return creditors_from_db;
    } catch (error) {
        console.log(error)
        throw createError({
            statusCode: 404,
        })
    }
})