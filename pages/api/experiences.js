import { addExperience, getExperiences } from "../../server/db";
import { getSession } from "next-auth/client";

export default async function experiences(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST" && session) {
    addExperience(req.body).then((experience) => {
      console.log("EXPERIENCE ADDED TO DB");
    });
    res.status(200).end();
  } else if (req.method === "GET") {
    // getExperiences().then((experiences) => {
    //   console.log("req", res)
    //   // console.log("all experiences: ", experiences)
    // });
    console.log("res", res.body)
    res.status(200).end();
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method  Not Allowed`);
  }
}
