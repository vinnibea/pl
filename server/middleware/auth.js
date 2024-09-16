import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event);
  const token = await getCookie(event, 'uid');
  if (headers.authorization) {
    const valid_password = bcrypt.compareSync(useRuntimeConfig().api, headers.authorization);
    console.log(valid_password, useAppConfig().api)
    if (valid_password) {
      event.context.bot = true;
      console.log(event.context.bot)
    }
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
