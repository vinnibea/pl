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
    const user_exist = await users.findOne({ email: user_data.email });

    if (!user_exist) {
        throw createError({
            statusCode: 404,
            statusMessage: "Wrong password or/and email",
        })
    } else if (user_exist) {
        const valid_password = bcrypt.compareSync(user_data.password, user_exist.password);
        if (!valid_password) {
            throw createError({
                statusCode: 404,
                message: "Wrong password or/and email",
            })
        } else {
            const user_dto = dto.user_to_dto(user_exist);
           
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
        throw createError({
            statusCode: 420,
            message: 'Something with DB'
        })
    }
})