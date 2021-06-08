import dbConnect from "../server/mongodbConnect";
import {sendError} from "next/dist/next-server/server/api-utils";
import {getUserExperiences} from "../server/models/experiences";
import Joi from "joi"

// Checks if user has already submitted an experience for a given transition
export const alreadySubmitted = async (req, res, next) => {
    await dbConnect();
    const {uid, from, to} = req.body
    const experiences = await getUserExperiences(uid)

    if (experiences.find(experience => experience.from === from && experience.to === to)) {
        res.json(401).send({message: 'Already submitted'});
    }
    next()
}

// Checks if form data has required data
const experienceSchema = Joi.object().keys({
    author: Joi.string().required(),
    author_id: Joi.string().required(),
    category: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    fulfillment: Joi.string().required(),
    ease_of_transition: Joi.string().required(),
    regret: Joi.string().required(),
    story: Joi.string().required(),
    helpful: Joi.number(),
    not_helpful: Joi.number(),
    date_posted: Joi.number()
})

export const validRequestPayload = async (req, res, next) => {
    if (experienceSchema.validate(req.body).error !== undefined) {
        res.json(401).send({message: 'Invalid data'});
    }
    next()
}
