import { editUser, registerUser } from "../../server/db";
import { getSession } from "next-auth/client";

export default async function users(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST" && session) {
    console.log(req.body);
    registerUser(req.body).then((user) => {
      console.log("USER ADDED TO DB");
    });
    res.status(200).end();
  } else if (req.method === "PUT" && session) {
    editUser(req.body).then((user) => {
      console.log("USER UPDATED");
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method  Not Allowed`);
  }
}
