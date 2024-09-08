import { default as dto } from '../utils/dto';

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        throw createError({
            statusCode: 401,
        })
    }
    
    const user = event.context.auth;
    if (user) {

        const sent_user = dto.user_to_dto(user);
        return sent_user;
    } else {
        throw createError({
            statusCode: 401,
            message: 'Session expired'
        });
    }
})