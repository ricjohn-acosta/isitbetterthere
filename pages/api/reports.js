import { addReport, getReport } from "../../server/db";
import { getSession } from "next-auth/client";

export default async function ratings(req, res) {
  return new Promise(async (resolve) => {
    const session = await getSession({ req });

    if (req.method === "POST" && session) {
      const userReport = await getReport({reported_by: req.body.reported_by, experience_id: req.body.experience_id});

      if (userReport.length === 0) {
        addReport(req.body).then((report) => {
        });
        res.status(200).end();
      } else {
        res.status(200).end();
        res.status(405).end(`Method  Not Allowed`);
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method  Not Allowed`);
    }
  });
}
