import { getUsers, registerUser } from "../../server/db";



export default async function addUser(req, res) {
  if (req.method === "POST") {
    console.log(req.body)
    registerUser(req.body).then((user) => {
      console.log("USER ADDED TO DB")
    });
    res.status(200).end()
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method  Not Allowed`);
  }
}
