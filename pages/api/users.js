import { editUser, registerUser, getUser } from "../../server/db";
import { getSession } from "next-auth/client";

export default async function users(req, res) {
  return new Promise(async (resolve) => {
    const session = await getSession({ req });

    if (req.method === "POST" && session) {
      const user = await getUser(req.body.user_id);
      console.log("USER", user)
      if (!user) {
        registerUser(req.body).then((user) => {
          console.log("USER ADDED TO DB");
        });
        res.status(200).end();
        return resolve();
      } else {
        res.status(200).end();
        return resolve();
      }
    } else if (req.method === "PUT" && session) {
      editUser(req.body).then((user) => {
        console.log("USER UPDATED");
      });
      return resolve();
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method  Not Allowed`);
      return resolve();
    }
  });
}
