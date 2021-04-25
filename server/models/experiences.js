import mongoose from 'mongoose'

const ExperienceSchema = new mongoose.Schema({
    posted_by: {
        type: String,
        required: [true, 'Please provide your name.'],
        maxlength: [20, 'Name cannot be more than 20 characters'],
    },
    category: {
        type: String,
        required: [true, "Please provide a category."],
        maxlength: [20],
    },
    from: {
        type: String,
        required: [true, 'Please specify where you are transitioning from'],
        maxlength: [20],
    },
    to: {
        type: String,
        required: [true, 'Please specify where you are transitioning to.'],
        maxlength: [20],
    },
    fulfillment: {
        type: String,
        required: [true, 'Please specify how fulfilling the transition was.'],
        maxlength: [20],
    },
    ease_of_transition: {
        type: String,
        required: [true, 'Please specify how easy the transition was.'],
        maxlength: [20],
    },
    regret: {
        type: String,
        required: [true, 'Please specify if you regret the transition.'],
        maxlength: [20],
    },
    story: {
        type: String,
        required: [true, 'Please share your story.'],
        maxlength: [10000]
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
    date_posted: {
        type: Number,
        required: [true, 'Please specify the species of your pet.'],
    },
})

const experiencesCollection = mongoose.models.Experiences || mongoose.model('Experiences', ExperienceSchema)

export const getUserExperiences = async (uid) => {
    return experiencesCollection.find({posted_by: uid});
}
