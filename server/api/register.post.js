import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from '~/lib/prisma';


export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const saltRounds = 3;
    const register_data = await readBody(event);


    if (Object.keys(register_data).length === 6) {
        const tp_from_client = getCookie(event, 'tp');
        const client_cid = getCookie(event, '_cid');
        if (!tp_from_client || !client_cid) {
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

            const { name, surname, phone, city, email, _sid } = register_data;
            const hashed_password = bcrypt.hashSync(verified_tp, saltRounds)


            try {
                await prisma.uncompleted.delete({
                    where: {
                        email: register_data.email,
                    }
                })
                const user_exist = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: register_data.email },
                            { phone: register_data.phone }
                        ]
                    }
                })

                if (user_exist) {
                    await prisma.user.update({
                        where: {
                            id: user_exist.id,
                        },

                        data: {
                            subscription: true,
                        }
                    })
                    await deleteCookie(event, 'tp');
                    await deleteCookie(event, '_cid');
                    await setCookie(event, 'fr', true, { httpOnly: true, maxAge: 60 * 60 })
                    return {
                        statusCode: 201,
                    }
                } else {
                    const new_user = await prisma.user.create({
                        data: {
                            name,
                            surname,
                            phone,
                            city,
                            email,
                            password: hashed_password,
                            subscription: true,
                            customerID: verified_cid,
                            sID: _sid,
                        }
                    })


                    await deleteCookie(event, 'tp');
                    await deleteCookie(event, '_cid');
                    await setCookie(event, 'fr', true, { httpOnly: true, maxAge: 60 * 60 })
                    return {
                        statusCode: 201,
                    }

                }



            } catch (error) {

                throw createError({
                    statusCode: 400,
                    message: 'Пользователь с такими данными уже существует'
                })
            }
        }
    }
})