import dbConnect from "../../../server/mongodbConnect";
import {addExperience, rateHelpfulExperience} from "../../../server/models/experiences";
import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from 'next-connect';
import {alreadySubmitted, validRequestPayload} from "../../../middlewares/experienceValidator";
import {getSession} from "next-auth/client";


export const axiosAddExperience = (formData) => {
    return axios.post(API_SERVER + '/api/experiences/createNew', formData)
}

const handler = nc()

handler
    .use(alreadySubmitted)
    .use(validRequestPayload)
    .post(async (req, res) => {
        // await dbConnect();
        const session = await getSession({ req })
        if (session) {
            await addExperience(req.body)
        } else {
            res.json(401).send({message: 'Not valid'});
        }

        res.status(200).end();
    })
export default handler

