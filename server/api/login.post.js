import { default as users } from '../schemas/user';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {default as dto} from '../utils/dto';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const user_data = await readBody(event);
    
    if (!user_data.password || !user_data.email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Заполните все необходимые поля для продолжения',
        })
    }
try{
    const user_exists = await users.findOne({ email: user_data.email });
    if (!user_exists) {
        throw createError({
            statusCode: 404,
            statusMessage: "Wrong password or/and email",
        })
    } else if (user_exists) {
        const valid_password = bcrypt.compareSync(user_data.password, user_exists.password);
        if (!valid_password) {
            throw createError({
                statusCode: 404,
                message: "Wrong password or/and email",
            })
        } else {
            const user_dto = dto.user_to_dto(user_exists);
           console.log(user_dto, 'dto')
           console.log(user_exists, 'user_exists')
            const token = jwt.sign(
                user_dto, config.secret, { expiresIn: '2h' });
                setCookie(event, 'uid', token, {httpOnly: true, maxAge: 60 * 60 * 2});
            return {
                statusCode: 301,
                data: user_dto,
            }
            
        }
} 
   
    } catch(e) {
        console.log(e)
        throw createError({
            statusCode: 409,
            message: 'Something with DB'
        })
    }
})