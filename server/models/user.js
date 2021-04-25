import User from "../../models/User";

export const getUserBySessionId = async (sessionId) => {
    return await User.findOne({uid: sessionId}).exec()
}