import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from "next-connect";
import dbConnect from "../../../server/mongodbConnect";
import {rateHelpfulExperience} from "../../../server/models/experiences";

export const axiosRateHelpfulExperience = (data) => {
    console.log('axiosRateHelpfulExperience', data)
    return axios.post(API_SERVER + '/api/experiences/rateHelpful', data)
}

const handler = nc()

handler
    .post(async (req, res) => {
        const {experienceID, userID} = req.body
        console.log('rateHelpful api', req.body)
        await dbConnect();
        await rateHelpfulExperience(userID, experienceID)
        res.status(200).end();
    })

export default handler