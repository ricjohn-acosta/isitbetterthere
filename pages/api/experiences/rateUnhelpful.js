import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from "next-connect";
import dbConnect from "../../../server/mongodbConnect";
import {rateUnhelpfulExperience} from "../../../server/models/experiences";

export const axiosRateUnhelpfulExperience = (data) => {
    console.log('axiosRateHelpfulExperience', data)
    return axios.post(API_SERVER + '/api/experiences/rateUnhelpful', data)
}

const handler = nc()

handler
    .post(async (req, res) => {
        const {experienceID, userID} = req.body
        await dbConnect();
        await rateUnhelpfulExperience(userID, experienceID)
        const result = await rateUnhelpfulExperience(userID, experienceID)

        result ? res.status(200).end() : res.send('Failed')
    })

export default handler