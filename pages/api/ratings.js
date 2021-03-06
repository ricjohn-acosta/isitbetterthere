// import {
//   addRating,
//   rateExperience,
//   getRatedExperiences,
// } from "../../server/db.txt";
import { getSession } from "next-auth/client";

export default async function ratings(req, res) {
  return new Promise(async (resolve) => {
    const session = await getSession({ req });

    if (req.method === "PUT" && session) {
      const userRatedExperiences = await getRatedExperiences(req.body.user_id);
      const ratedExperience = userRatedExperiences.find(
        ({ user_id, experience_id }) =>
          user_id === req.body.user_id &&
          experience_id === req.body.experience_id
      );

      if (!ratedExperience) {
        addRating(req.body).then((rating) => {
        });
        rateExperience(req.body).then((rating) => {
        });
        res.status(200).end();
        return resolve();
      }

      // only allow a helpful rating if user has not rated an experience as helpful before
      if (req.body.is_helpful === true && (ratedExperience.is_helpful === 0 || ratedExperience.is_helpful === false)) {
        addRating(req.body).then((rating) => {
        });
        rateExperience(req.body).then((rating) => {
        });
        res.status(200).end();
        return resolve();
      }

      // only allow an unhelpful rating if user has not rated an experience as unhelpful before
      if (req.body.is_helpful === false && (ratedExperience.is_helpful === 1 || ratedExperience.is_helpful === true)) {
        addRating(req.body).then((rating) => {
        });
        rateExperience(req.body).then((rating) => {
        });
        res.status(200).end();
        return resolve();
      }
    } else {
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method  Not Allowed`);
      return resolve();
    }
  });
}
