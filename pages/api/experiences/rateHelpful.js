import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from "next-connect";
import dbConnect from "../../../server/mongodbConnect";
import {rateHelpfulExperience} from "../../../server/models/experiences";
import { getSession } from 'next-auth/client'

export const axiosRateHelpfulExperience = (data) => {
    return axios.post(API_SERVER + '/api/experiences/rateHelpful', data)
}

const handler = nc()

handler
    .post(async (req, res) => {
        const {experienceID, userID} = req.body
        const session = await getSession({ req })
        // await dbConnect();
        if (session) {
            await rateHelpfulExperience(userID, experienceID)
        } else {
            res.json(401).send({message: 'Not valid'});
        }

        res.status(200).end()
    })

export default handler