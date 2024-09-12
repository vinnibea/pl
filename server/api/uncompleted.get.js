


import {default as uncompleted} from '../schemas/uncompleted';

export default defineEventHandler(async(event) => {
    try {
      const uncompleted_from_db = await uncompleted.find({});

      return uncompleted_from_db;
    } catch (e) {
        console.log(e)
        return {
            statusCode: 400,
            message: 'Nothing found',
        }
    } 
})