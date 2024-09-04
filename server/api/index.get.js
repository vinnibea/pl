import jwt from 'jsonwebtoken';
import { default as users } from '../schemas/user';
import { default as dto } from '../utils/dto';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    if(event.context.auth) {
      return dto.user_to_dto(event.context.auth);
    }


   try {
    const user = await getCookie(event, "uid");
    if(user) {
        try {
           const verified_user = await jwt.verify(user, config.secret);
           const user_data = await users.findById(verified_user.id);
           if (!user_data) {
            throw createError({
              statusCode: 404,
              message: "User not found"
            })
           }


           const user_dto = dto.user_to_dto(user_data);
           const token = jwt.sign(user_dto, config.secret, { expiresIn: '2h' })
           setCookie(event, 'uid', token, {httpOnly: true, maxAge: 60 * 60 * 2});

           return user_dto;
        } catch(e) {
            throw createError({
                statusMessage: 'Watch here!',
                statusCode: 407,
            })
        } 
    } else {
        return ({
            statusCode: 401,
            message: 'Unauthorized',
        })
    }
   } catch (error) {
     throw createError({
        statusCode: 400,
        statusMessage: 'some'
     })
   }
   
})