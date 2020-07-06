import { addRating, rateExperience } from "../../server/db";
import { getSession } from "next-auth/client";

export default async function ratings(req, res) {
  const session = await getSession({ req });
  console.log("TEEEEEST", req.body.is_helpful)

  if (req.method === "PUT" && session) {
    addRating(req.body).then((rating) => {
      console.log("EXPERIENCE RATING ADDED TO DB");
    });
    
    rateExperience(req.body).then((rating) => {
      console.log("RATED EXPERIENCE AS HELPFUL");
    });
    res.status(200).end();
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method  Not Allowed`);
  }
}
