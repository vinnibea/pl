import { default as uncompleted } from '../schemas/uncompleted';
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {name, email, surname, phone, city} = body;
    console.log(body)
    if (!body || [name, email, surname, phone, city].some(el => !el.length)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid data',
        })
    } else {
        const in_db = await uncompleted.find({ email: body.email });

        if (in_db) {
            return {
                statusCode: 203,
                status: 'OK'
            }
        }}
    

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
})