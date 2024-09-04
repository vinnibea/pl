import jwt from 'jsonwebtoken';
  
  export default defineEventHandler(async (event) => {
    const token = await getCookie(event, 'uid');

    if(token) {
       try {
        const verified_token = jwt.verify(token, useRuntimeConfig().secret);
        
        event.context.auth = {...verified_token}
       } catch (error) {
        event.context.auth = false;
       }
    }
  })
