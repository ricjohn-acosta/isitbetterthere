import dbConnect from "../../../server/mongodbConnect";
import axios from "axios";
import {API_SERVER} from "../../../lib/constants";
import nc from 'next-connect';
import {updateUser} from "../../../server/models/user";
import {getSession} from "next-auth/client";

export const axiosEditUser = (data) => {
    return axios.put(API_SERVER + '/api/users/edit', data)
}

const handler = nc()

handler
    .put(async (req, res) => {
        // await dbConnect();
        const session = await getSession({ req })
        if (session) {
            await updateUser(req.body);
        } else {
            res.json(401).send({message: 'Not valid'});
        }

        res.status(200).end();
    })

export default handler

