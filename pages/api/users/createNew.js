import dbConnect from "../../../server/mongodbConnect";
import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from 'next-connect';
import {createUser} from "../../../server/models/user";


export const axiosCreateNewUser = (data) => {
    return axios.post(API_SERVER + '/api/users/createNew', data)
}

const handler = nc()

handler
    .post(async (req, res) => {
        await dbConnect();
        await createUser(req.body);
        res.status(200).end();
    })

export default handler

