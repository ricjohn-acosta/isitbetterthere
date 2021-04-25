 // import User from "../../../models/User"
// import dbConnect from "../../../server/mongodbConnect";
// import { getSession } from "next-auth/client";
//
// export default async function handler(req, res) {
//     return new Promise(async (resolve) => {
//         const session = await getSession({req});
//         if (!session) return resolve();
//
//         await dbConnect();
//
//         switch (req.method) {
//             case "POST":
//                 // if (!isValid(req.body, "new-user")) {
//                 //     res.status(200).end();
//                 //     return resolve();
//                 // }
//
//                 const user = await User.find({uid: req.body.uid}).exec()
//                 console.log("USER", user);
//                 if (user.length === 0) {
//                     await User.create(req.body).exec()
//                     res.status(200).end();
//                     return resolve();
//                 } else {
//                     res.status(200).end();
//                     return resolve();
//                 }
//             default:
//                 res.setHeader("Allow", ["GET"]);
//                 res.status(405).end(`Method  Not Allowed`);
//                 return resolve();
//         }
//     });
// }