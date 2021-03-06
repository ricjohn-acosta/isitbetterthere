import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from "next-connect";
import dbConnect from "../../../server/mongodbConnect";
import {rateUnhelpfulExperience} from "../../../server/models/experiences";

export const axiosRateUnhelpfulExperience = (data) => {
    return axios.post(API_SERVER + '/api/experiences/rateUnhelpful', data)
}

const handler = nc()

handler
    .post(async (req, res) => {
        const {experienceID, userID} = req.body
        await dbConnect();
        await rateUnhelpfulExperience(userID, experienceID)

        res.status(200).end()
    })

export default handler