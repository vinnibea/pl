import jwt from 'jsonwebtoken';
import { default as dto} from '../utils/dto';

export default defineEventHandler(async (event) => {
    const user = event.context.auth;
    if(user) {
       
        const sent_user = dto.user_to_dto(user);
      console.log(`profile.user`)
        
        return sent_user;
    } else {
        throw createError({
            statusCode: 401,
            message: 'Session expired'
        });
    }
})