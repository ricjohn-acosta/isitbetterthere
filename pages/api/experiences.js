import {getSession} from "next-auth/client";
import dbConnect from "../../server/mongodbConnect";
import {dbAddExperience} from "../../server/models/experiences";
import axios from "axios";
import {API_SERVER} from "../../lib/constants";
import nc from 'next-connect';
import next from 'next-connect'
import experienceValidator, {alreadySubmitted, validRequestPayload} from "../../middlewares/experienceValidator";


export const axiosAddExperience = (formData) => {
    return axios.post(API_SERVER + '/api/experiences', formData)
}

      const userExperience = await getUserExperience({
        posted_by: req.body.posted_by,
        category: req.body.category,
        from: req.body.from,
        to: req.body.to,
      });

      if (userExperience.length === 0) {
        addExperience(req.body).then((experience) => {
          console.log("EXPERIENCE ADDED TO DB");
        });
        res.status(200).end();
    })
export default handler

