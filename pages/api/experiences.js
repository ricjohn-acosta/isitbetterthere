import {getSession} from "next-auth/client";
import dbConnect from "../../server/mongodbConnect";
import {dbAddExperience} from "../../server/models/experiences";
import axios from "axios";
import {API_SERVER} from "../../lib/constants";
import nc from 'next-connect';
import next from 'next-connect'
import experienceValidator, {alreadySubmitted, validRequestPayload} from "../../middlewares/experienceValidator";


export const axiosAddExperience = (formData) => {
    return axios.post(API_SERVER + '/api/experiences', formData)
}

const handler = nc()

handler
    .use(alreadySubmitted)
    .use(validRequestPayload)
    .post(async (req, res) => {
        console.log(res)
        await dbConnect();
        await dbAddExperience(req.body)
        res.status(200).end();
    })
export default handler

