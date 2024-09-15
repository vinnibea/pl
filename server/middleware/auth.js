import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const valid_password = bcrypt.compareSync(headers.authorization, useRuntimeConfig().api);
  const token = await getCookie(event, 'uid');
  if(valid_password) {
    event.context._bot = true;
  }
  if (token) {
    try {
      const verified_token = jwt.verify(token, useRuntimeConfig().secret);

      event.context.auth = { ...verified_token }
    } catch (error) {
      event.context.auth = false;
    }
  }
})
