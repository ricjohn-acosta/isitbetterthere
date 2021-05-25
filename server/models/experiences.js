import mongoose from 'mongoose'
import {ObjectId} from "bson";

const ExperienceSchema = new mongoose.Schema({
    posted_by: {
        type: String,
        required: [true, 'Please provide your name.'],
    },
    category: {
        type: String,
        required: [true, "Please provide a category."],
    },
    from: {
        type: String,
        required: [true, 'Please specify where you are transitioning from'],
    },
    to: {
        type: String,
        required: [true, 'Please specify where you are transitioning to.'],
    },
    fulfillment: {
        type: String,
        required: [true, 'Please specify how fulfilling the transition was.'],
    },
    ease_of_transition: {
        type: String,
        required: [true, 'Please specify how easy the transition was.'],
    },
    regret: {
        type: String,
        required: [true, 'Please specify if you regret the transition.'],
    },
    story: {
        type: String,
        required: [true, 'Please share your story.'],
    },
    helpful: {
        type: Number,
        required: true,
    },
    not_helpful: {
        type: Number,
        required: true,
    },
    users_helped: {
        type: Array,
        required: true,
    },
    users_notHelped: {
        type: Array,
        required: true
    },
    date_posted: {
        type: Number,
        required: [true, 'Please specify the species of your pet.'],
    },
})

const experiencesCollection = mongoose.models && mongoose.models.Experiences || mongoose.model('Experiences', ExperienceSchema)

export const addExperience = async (formData) => {
    return experiencesCollection.create(formData)
}

export const getUserExperiences = async (uid) => {
    return experiencesCollection.find({posted_by: uid});
}

export const getTransitionExperiencesTest = async (from, to) => {
    // return experiencesCollection.find({from, to});
    return experiencesCollection.aggregate([
        {$match: {from, to}},
        {
            $lookup: {
                from: 'users',
                localField: 'posted_by',
                foreignField: 'uid',
                as: 'user'
            }
        }
    ])
}

export const getTransitionExperiencesCount = async (from, to) => {
    return experiencesCollection.find({from, to}).count();
}

export const getAllUsersExperiences = async () => {
    return experiencesCollection.aggregate([{
        $lookup: {
            from: 'users',
            localField: 'posted_by',
            foreignField: 'uid',
            as: 'user'
        }
    }])
}

export const getTotalNumberOfExperiences = async () => {
    return experiencesCollection.count()
}

export const rateHelpfulExperience = async (userID, experienceID) => {
    const experienceDoc = await experiencesCollection.findOne({_id: experienceID})

    if (experienceDoc.users_notHelped.includes(userID)) {
        await experiencesCollection.updateOne({_id: experienceID}, {
            $pull: {users_notHelped: userID},
            $inc: {not_helpful: -1}
        })
    }

    return experiencesCollection.updateOne({_id: experienceID}, {$push: {users_helped: userID}, $inc: {helpful: 1}})
}

export const rateUnhelpfulExperience = async (userID, experienceID) => {
    const experienceDoc = await experiencesCollection.findOne({_id: experienceID})

    if (experienceDoc.users_helped.includes(userID)) {
        await experiencesCollection.updateOne({_id: experienceID}, {
            $pull: {users_helped: userID},
            $inc: {helpful: -1}
        })
    }

    return experiencesCollection.updateOne({_id: experienceID}, {$push: {users_notHelped: userID}, $inc: {not_helpful: 1}})
}

