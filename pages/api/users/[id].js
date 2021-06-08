import dbConnect from "../../../server/mongodbConnect";
import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from 'next-connect';
import {getUserById} from "../../../server/models/user";


export const axiosGetUserById = (id) => {
    return axios.get(API_SERVER + `/api/users/${id}`)
}

const handler = nc()

handler
    .get(async (req, res) => {
        await dbConnect();
        const data = await getUserById(req.query.id)

        if (data.length === 0) {
            res.send('Not found')
        } else {
            res.send(await getUserById(req.query.id))
        }

    })

export default handler

