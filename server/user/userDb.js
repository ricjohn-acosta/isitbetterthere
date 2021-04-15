import dbConnect from "../mongodbConnect";
import User from "../../models/User";

export const getUserByUid = (uid) => {
    return get
}

export const getUserBySessionId = async (sessionId) => {
    return await User.findOne({uid: sessionId}).exec()
}