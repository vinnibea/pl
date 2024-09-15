import {default as creditors} from '../schemas/creditor';
import bcrypt from 'bcrypt';
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (!event.context._bot) throw createError({
        statusCode: 400,
        statusMessage: 'Forbidden',
    })

    if(!body) {
        throw createError({
            statusCode: 400,
            message: 'Data can`t be empty',
        })
    }
  
    
    if(!body || body.id === null || body.action === null) {
        throw createError({
            message: 'Ты что мне такое шлешь, бля'
        })
    }
  
  if(body.link && body.link !== null && body?.action !== null && body?.id !== null) {
        try {
            await creditors.findByIdAndUpdate(body.id, { link: body.link }, {
                upsert: true,
                new: true,
            })

            return {
                statusCode: 200,
                message: 'Действие успешно произведено'
            };
            
        } catch(e) {
            return {
                statusCode: 400,
                statusMessage: 'Не удалось'
            }
        }

  }
  

    switch (body.action) {
        case 'recommend': {
            try {
                await creditors.findByIdAndUpdate(body.id, { isRecommended: true }, {
                    upsert: true,
                    new: true,
                })
                console.log('this')
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
                await creditors.findByIdAndUpdate(body.id, { isRecommended: false }, {
                    upsert: true,
                    new: true,
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
                await creditors.findByIdAndUpdate(body.id, { isActive: false }, {
                    upsert: true,
                    new: true,
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
                await creditors.findByIdAndUpdate(body.id, { isActive: true }, {
                    upsert: true,
                    new: true,
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