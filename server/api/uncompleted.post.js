import { default as uncompleted } from '../schemas/uncompleted';
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log(body)
    if (!body) {
        throw createError({
            statusCode: 400,
            message: 'Invalid data',
        })
    } else {
        try {
            const fresh_uncompleted = await uncompleted.create({
                email: body.email,
                name: body.name,
                surname: body.surname,
                phone: body.phone,
                city: body.city,
            })
            console.log(fresh_uncompleted);
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
    }
})