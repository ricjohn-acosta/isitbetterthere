import {
  addExperience,
  editExperience,
  deleteExperience,
  getUserExperience,
} from "../../server/db";
import { getSession } from "next-auth/client";

export default async function experiences(req, res) {
  return new Promise(async (resolve) => {
    const session = await getSession({ req });

    if (req.method === "POST" && session) {
      const {posted_by: uid, category: category} = req.body
      const userExperience = await getUserExperience({posted_by: uid, category});

      if (userExperience.length === 0) {
        addExperience(req.body).then((experience) => {
          console.log("EXPERIENCE ADDED TO DB");
        });
        res.status(200).end();
        return resolve();
      } else {
        res.status(200).end();
        return resolve();
      }
    } else if (req.method === "PUT" && session) {
      editExperience(req.body).then((experience) => {
        console.log("EXPERIENCE UPDATED");
      });
      res.status(200).end();
      return resolve();
    } else if (req.method === "DELETE" && session) {
      deleteExperience(req.body).then((experience) => {
        console.log("EXPERIENCE DELETED");
      });
      res.status(200).end();
      return resolve();
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method  Not Allowed`);
      return resolve();
    }
  });
}
