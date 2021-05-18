import { editUser, registerUser, getUser } from "../../server/db";
import { getSession } from "next-auth/client";
import { isValid } from "../../server/utils/validateInputs";

export default async function users(req, res) {
  return new Promise(async (resolve) => {
    const session = await getSession({ req });

    if (req.method === "POST" && session) {

      if (!isValid(req.body, "new-user")) {
        res.status(200).end();
        return resolve();
      }

      const user = await getUser(req.body.user_id);
      console.log("USER", user);
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
      res.status(200).end();
      return resolve();
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method  Not Allowed`);
      return resolve();
    }
  });
}
