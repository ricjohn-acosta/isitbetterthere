import { addExperience, editExperience, deleteExperience } from "../../server/db";
import { getSession } from "next-auth/client";

export default async function experiences(req, res) {
  const session = await getSession({ req });
  
  if (req.method === "POST" && session) {
    addExperience(req.body).then((experience) => {
      console.log("EXPERIENCE ADDED TO DB");
    });
    res.status(200).end();
  } else if (req.method === "PUT" && session) {
    editExperience(req.body).then((experience) => {
      console.log("EXPERIENCE UPDATED");
    });
    res.status(200).end();
  } else if (req.method === "DELETE" && session) {
    deleteExperience(req.body).then((experience) => {
      console.log("EXPERIENCE UPDATED");
    });
    res.status(200).end();
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method  Not Allowed`);
  }
}
