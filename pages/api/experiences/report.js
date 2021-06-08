import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from "next-connect";
import dbConnect from "../../../server/mongodbConnect";
import {addReport} from "../../../server/models/reportedExperience";

export const axiosReportExperience = (data) => {
    return axios.post(API_SERVER + '/api/experiences/report', data)
}

const handler = nc()

handler
    .post(async (req, res) => {
        await dbConnect();
        await addReport(req.body)
        res.status(200).end();
    })

export default handler