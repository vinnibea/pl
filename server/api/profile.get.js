import jwt from 'jsonwebtoken';
import { default as dto} from '../utils/dto';

export default defineEventHandler(async (event) => {
    const user = event.context.auth;
    if(user) {
        const token_refresh = jwt.sign(user, useRuntimeConfig().secret);
        const sent_user = dto.user_to_dto(user);
        await setCookie(event, 'uid', token_refresh, {maxAge: 60 * 60 * 2});
        
        return sent_user;
    } else {
        throw createError({
            statusCode: 401,
            message: 'Session expired'
        });
    }
})