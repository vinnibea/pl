import { default as creditors } from '../schemas/creditor';
import { prisma } from "~/server/prisma"
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (!event.context._bot) throw createError({
        statusCode: 400,
        statusMessage: 'Forbidden',
    })

    if (!body) {
        throw createError({
            statusCode: 400,
            message: 'Data can`t be empty',
        })
    }


    if (!body || body.id === null || body.action === null) {
        throw createError({
            message: 'Ты что мне такое шлешь, бля'
        })
    }

    if (body.link && body.link !== null && body?.action !== null && body?.id !== null) {
        try {
            await prisma.creditor.update({
                where: {
                    id: body.id,
                },
                data: {
                    link: body.link,
                }
            })
            return {
                statusCode: 200,
                message: 'Действие успешно произведено'
            };

        } catch (e) {
            return {
                statusCode: 400,
                statusMessage: 'Не удалось'
            }
        }

    }


    switch (body.action) {
        case 'recommend': {
            try {
                await prisma.creditor.update({
                    where: {
                        id: body.id,
                    },
                    data: {
                        isRecommended: true,
                    }
                })
               
                return {
                    statusCode: 200,
                    message: 'Действие успешно произведено'
                };

            } catch (error) {
                throw createError({
                    statusCode: 400,
                    message: 'Не удалось..'
                })
            }
        }

        case 'not_recommend': {
            try {
                await prisma.creditor.update({
                    where: {
                        id: body.id,
                    },
                    data: {
                        isRecommended: false,
                    }
                })
                return {
                    statusCode: 200,
                    message: 'Действие успешно произведено'
                };
            } catch (error) {

                throw createError({
                    statusCode: 400,
                    message: 'Не удалось..'
                })
            }
        }
        case 'hide': {
            try {
                await prisma.creditor.update({
                    where: {
                        id: body.id,
                    },
                    data: {
                        isActive: false,
                    }
                })
                return {
                    statusCode: 200,
                    message: 'Действие успешно произведено'
                };
            } catch (error) {
                throw createError({
                    statusCode: 400,
                    message: 'Не удалось..'
                })
            }
        }

        case 'show': {
            try {
                await prisma.creditor.update({
                    where: {
                        id: body.id,
                    },
                    data: {
                        isActive: true,
                    }
                })
                return {
                    statusCode: 200,
                    message: 'Действие успешно произведено'
                };
            } catch (error) {

                throw createError({
                    statusCode: 400,
                    message: 'Не удалось..'
                })
            }
        }

        default: {
            throw createError({
                statusCode: 400,
                message: 'Не удалось..'
            })
        }
    }
})