import { addReport } from "../../server/db";
import { getSession } from "next-auth/client";

export default async function ratings(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST" && session) {
    addReport(req.body).then((report) => {
      console.log("EXPERIENCE REPORTED");
    });

    res.status(200).end();
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method  Not Allowed`);
  }
}
