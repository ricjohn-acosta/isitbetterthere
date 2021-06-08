import mongoose from 'mongoose'

const ReportedExperienceSchema = new mongoose.Schema({
    reported_by: {
        type: String,
    },
    experience_id: {
        type: String,
    },
    violation_type: {
        type: String,
    },
    date_reported: {
        type: String,
    },
    content: {
        type: String,
    }
})

const reportedExperiencesCollection = mongoose.models && mongoose.models.ReportedExperiences || mongoose.model('ReportedExperiences', ReportedExperienceSchema)

export const addReport = async (report) => {
    return reportedExperiencesCollection.create(report)
}