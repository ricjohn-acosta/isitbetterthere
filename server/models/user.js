import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    uid: {type: String, required: true},
    profile_picture: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    bio: {type: String, required: true},
    occupation: {type: String, required: true},
    position: {type: String, required: true},
    company: {type: String, required: true},
    location: {type: String, required: true},
    hide_name: {type: Boolean, required: true},
    hide_email: {type: Boolean, required: true},
    hide_occupation: {type: Boolean, required: true},
    hide_company: {type: Boolean, required: true},
    hide_location: {type: Boolean, required: true},
    comes_from: {type: String, required: true},
    date_joined: {type: Number, required: true},
    user_type: {type: String, required: true},
})

const userCollection = mongoose.models && mongoose.models.User || mongoose.model('User', UserSchema)

export const createUser = async (data) => {
    return await userCollection.create(data);
}

export const getUserBySessionId = async (sessionId) => {
    return await userCollection.findOne({uid: sessionId}).exec()
}