import { default as users } from '../schemas/user';

export default defineEventHandler(async (event) => {

    const users_from_db = await users.find({});

    return users_from_db;
})