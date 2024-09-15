import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma"


export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const saltRounds = 3;
    const body = await readBody(event);
    if (!body) {
        throw createError({
            statusCode: 400,
            message: 'Bad request'
        })
    }
    const { name, email, surname, phone, city, password } = body;
    if (!body || [name, email, surname, phone, city, password].some(el => !el || !el.length)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid data',
        })
    } else {
        const cookie = jwt.sign(password, config.secret);
        const in_db = await prisma.uncompleted.findFirst({
            where: {
                email: body.email,
            }
        });
        await setCookie(event, 'tp', cookie, { httpOnly: true, maxAge: 60 * 60 * 24 });
        if (in_db) {
            return {
                statusCode: 203,
                status: 'OK'
            }
        }
    }

    try {

        const cookie = jwt.sign(password, config.secret);
        await setCookie(event, 'tp', cookie, { httpOnly: true, maxAge: 60 * 60 * 24 });
        const fresh_uncompleted = await prisma.uncompleted.create({
            data: {
                email, 
                name,
                surname,
                city,
                phone,
            }
        })
        return {
            statusCode: 201,
            message: 'Created',
        }
    } catch (e) {
        throw createError({
            statusCode: 405,
            message: 'DB process failed',
        })
    }
})