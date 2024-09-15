export default defineEventHandler(async (event) => {
    try {
        await deleteCookie(event, 'uid');
        return {
            statusCode: 301,
        }
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: 'Something went wrong on the server'
    })
    }
})