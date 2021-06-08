import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from "next-connect";
import dbConnect from "../../../server/mongodbConnect";
import {rateHelpfulExperience} from "../../../server/models/experiences";

export const axiosRateHelpfulExperience = (data) => {
    return axios.post(API_SERVER + '/api/experiences/rateHelpful', data)
}

const handler = nc()

handler
    .post(async (req, res) => {
        const {experienceID, userID} = req.body
        console.log('rateHelpful api', req.body)
        await dbConnect();
        const result = await rateHelpfulExperience(userID, experienceID)

        result ? res.status(200).end() : res.send('Failed')
    })

export default handler