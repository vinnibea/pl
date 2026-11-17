import { getToken } from "~/server/utils/airwallex";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const token = await getToken()
    
    return { token }
})