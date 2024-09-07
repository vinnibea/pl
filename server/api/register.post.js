import { default as users } from '../schemas/user';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const saltRounds = 3;
    const register_data = await readBody(event);

    if (register_data.password && !register_data.email) {
        const cookie = jwt.sign(register_data.password, config.secret);
       await setCookie(event, 'tp', cookie, {httpOnly: true, maxAge: 60 * 60 * 24});
        return {
            statusCode: 200,
        }
    }

    if (Object.keys(register_data).length === 7) {
        const tp_from_client = getCookie(event, 'tp');
        const client_cid = getCookie(event, '_cid');
        if(!tp_from_client || !client_cid) {
            throw createError({
                statusCode: 400,
                message: 'Заполните заявку еще раз'
            })
        }
 
        const verified_tp = jwt.verify(tp_from_client, config.secret);
        const verified_cid = jwt.verify(client_cid, config.secret);
        if (!verified_tp || !verified_cid) {
            throw createError({
                statusCode: 404,
                message: 'Отказано в доступе'
            });
        } else {

            const user_exist = await users.findOne({ email: register_data.email });
            if (user_exist) {
                throw createError({
                    statusCode: 409,
                    message: "Пользователь с такими данными уже существует"
                })
            } else {
                const { name, surname, index, phone, city, email, _sid } = register_data;
                const hashed_password = bcrypt.hashSync(verified_tp, saltRounds)
                try {
                    await users.create({
                        ...register_data,
                        password: hashed_password,
                        subscription: true,
                        _customerID: verified_cid,
                        _sID: _sid,

                    });
                    await deleteCookie(event, 'tp');
                    await deleteCookie(event, '_cid');
                    await setCookie(event, 'fr', true, {httpOnly: true, maxAge: 60 * 60})
                    return {
                      statusCode: 201,
                    }
                } catch (error) {
                    throw createError({
                        statusCode: 400,
                    })
                }

            }
        }
    } else {
        throw createError({
            statusCode: 400,
        })
    }


})