export default defineEventHandler(async(event) => {
    const body = await readBody(event);

    if(body.accepted) {
        await setCookie(event, 'cookies', true);

        return {
            statusCode: 200,
            message: 'Cookies accepted',
        }
    } else {
        throw createError({
            statusCode: 301,
            message: 'You can`t use this page',
        })
    }
})