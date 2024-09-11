import { default as emails } from '../schemas/email';

export default defineEventHandler(async (event) => {
    const headers = await getHeaders(event);
    console.log(event)
    const emails_from_db = await emails.find({});

    return { data: emails_from_db }
})