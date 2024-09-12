export default {
    user_to_dto(payload) {
        return {
            name: payload.name,
            surname: payload.surname,
            city: payload.city,
            phone: payload.phone,
            index: payload.index,
            email: payload.email,
            id: payload._id || payload.id,
            sid: payload._sID,
            hasEmail: payload.hasEmail,
            hasNotification: payload.hasNotification,
            deactivated: payload.deactivated,
            subscription: payload.subscription,
        }
    }
}