import { default as emails } from '../schemas/email';

export default defineEventHandler(async (event) => {
    const headers = await getHeaders(event);
  
    const emails_from_db = await emails.find({});

    return emails_from_db;
})