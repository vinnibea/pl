import { default as users } from '../schemas/user';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const config = useRuntimeConfig()

const saltRounds = 3;
export default defineEventHandler(async (event) => {
    const register_data = await readBody(event);
   console.log(register_data)
    if (register_data.password && !register_data.email) {
        const cookie = jwt.sign(register_data.password, config.secret);
        setCookie(event, 'tp', cookie);
        return {
            statusCode: 200,
        }
    }

    if (Object.keys(register_data).length === 6) {
        const cookie_from_client = await getCookie(event, 'tp');
        const verified_cookie = await jwt.verify(cookie_from_client, config.secret);
        if (!verified_cookie) {
            throw createError({
                statusCode: 404,
            });
        } else {
            await deleteCookie(event, 'tp')
            const user_exist = await users.findOne({ email: register_data.email });
            if (user_exist) {
                throw createError({
                    statusCode: 409,
                    statusMessage: "Пользователь с такими данными уже существует"
                })
            } else {
                const { name, surname, index, phone, city, email } = register_data;
                const hashed_password = bcrypt.hashSync(verified_cookie, saltRounds)
                try {
                    await users.create({
                        ...register_data,
                        password: hashed_password,
                    });

                    return {
                        name, surname, index, phone, city, email
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