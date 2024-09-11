export default defineEventHandler(async (event) => {
    if (!event?.context?.auth) {
        throw createError({
            statusCode: 401,
        })
    }
    
    const user = event.context.auth;
    if (user) {
        return user;
    } else {
        throw createError({
            statusCode: 401,
            message: 'Session expired'
        });
    }
})