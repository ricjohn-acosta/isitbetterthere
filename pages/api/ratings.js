import { rateExperience } from "../../server/db";
import { getSession } from "next-auth/client";

export default async function ratings(req, res) {
  const session = await getSession({ req });

  if (req.method === "PUT" && session) {
    rateExperience(req.body).then((rating) => {
      console.log("EXPERIENCE RATING ADDED TO DB");
    });
    res.status(200).end();
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method  Not Allowed`);
  }
}
