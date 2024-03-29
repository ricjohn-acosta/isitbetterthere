import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    uid: {type: String, required: true},
    profile_picture: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    bio: {type: String, required: false},
    occupation: {type: String, required: true},
    position: {type: String, required: false},
    company: {type: String, required: false},
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
    return userCollection.create(data);
}

export const updateUser = async (data) => {
    return userCollection.updateOne({uid: data.user_id}, {
        hide_name: data.hide_name,
        hide_email: data.hide_email,
        hide_occupation: data.hide_occupation,
        hide_company: data.hide_company,
        hide_location: data.hide_location,
    })
}

export const getUserById = async (sessionId) => {
    return userCollection.aggregate([
        {$match: {'uid': sessionId}},
        {
            $lookup: {
                from: 'experiences',
                localField: 'uid',
                foreignField: 'author_id',
                as: 'my_stories'
            }
        },
        {
            $lookup: {
                from: 'reportedexperiences',
                localField: 'uid',
                foreignField: 'reported_by',
                as: 'reported_stories'
            }
        },
        {
            $lookup: {
                from: "experiences",
                pipeline: [{$match: {$expr: {$in: [sessionId, "$users_helped"]}}}],
                as: "helpful_stories"
            }
        },
    ])

}