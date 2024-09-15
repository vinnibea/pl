export default {
    user_to_dto(payload) {
        return {
            name: payload.name,
            surname: payload.surname,
            city: payload.city,
            phone: payload.phone,
            email: payload.email,
            id: payload.id,
            sid: payload.sID,
            hasEmail: payload.hasEmail,
            hasNotification: payload.hasNotification,
            deactivated: payload.deactivated,
            subscription: payload.subscription,
        }
    }
}