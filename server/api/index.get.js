
import { default as dto } from '../utils/dto';


export default defineEventHandler(async (event) => {
    if (event.context.auth) {
        return dto.user_to_dto(event.context.auth);
    } else {
        return ({
            statusCode: 401,
            message: 'Unauthorized',
        })
    }


})