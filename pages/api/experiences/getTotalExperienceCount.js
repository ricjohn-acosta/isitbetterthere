import dbConnect from "../../../server/mongodbConnect";
import {getTotalNumberOfExperiences} from "../../../server/models/experiences";
import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from 'next-connect';


export const axiosGetTransitionExperiencesCount = () => {
    return axios.get(API_SERVER + '/api/experiences/getTotalExperienceCount')
}

const handler = nc()

handler
    .get(async (req, res) => {
        await dbConnect();
        const count = await getTotalNumberOfExperiences()
        res.send(count)
    })
export default handler

