import {default as creditors} from '../schemas/creditor';

export default defineEventHandler(async (event) => {
    const {id, action, link }= await readBody(event);
    if(id === null || action === null) {
        throw createError({
            message: 'Ты что мне такое шлешь, бля'
        })
    }

  if(link !== null && action !== null && id !== null) {
        try {
            await creditors.findByIdAndUpdate(id, { link}, {
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
  

    switch (action) {
        case 'recommend': {
            try {
                await creditors.findByIdAndUpdate(id, { isRecommended: true }, {
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
                await creditors.findByIdAndUpdate(id, { isRecommended: false }, {
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
                await creditors.findByIdAndUpdate(id, { isActive: false }, {
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
                await creditors.findByIdAndUpdate(ctx.session.id, { isActive: true }, {
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