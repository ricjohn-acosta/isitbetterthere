import dbConnect from "../../../server/mongodbConnect";
import {getSession} from "next-auth/client";
import {createUser, getUserBySessionId} from "../../../server/models/user";

export default async (req, res) => {

    const session = await getSession({req});
    if (!session) return;

    await dbConnect();

    switch (req.method) {
        case 'POST':
            // if (!isValid(req.body, "new-user")) {
            //     res.status(200).end();
            //     return resolve();
            // }
            const user = await getUserBySessionId(req.body.uid);
            if (!user) {
                await createUser(req.body);
                res.status(200).end();
                return
            } else {
                res.status(200).end();
                return
            }
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method  Not Allowed`);
    }

    // return new Promise(async (resolve) => {
    //     const session = await getSession({req});
    //     if (!session) return resolve();
    //
    //     console.log('WAAAAAA')
    //
    //     await dbConnect();
    //
    //     switch (req.method) {
    //         case "POST":
    //             // if (!isValid(req.body, "new-user")) {
    //             //     res.status(200).end();
    //             //     return resolve();
    //             // }
    //             const user = await User.find({uid: req.body.uid}).exec().then();
    //             console.log("USER", user);
    //             if (user.length === 0) {
    //                 await User.create(req.body).exec().then();
    //                 res.status(200).end();
    //                 return resolve();
    //             } else {
    //                 res.status(200).end();
    //                 return resolve();
    //             }
    //         default:
    //             res.setHeader("Allow", ["GET"]);
    //             res.status(405).end(`Method  Not Allowed`);
    //             return resolve();
    //     }
    //
    //     // const session = await getSession({req});
    //     //
    //     // if (req.method === "POST" && session) {
    //     //
    //     //     if (!isValid(req.body, "new-user")) {
    //     //         res.status(200).end();
    //     //         return resolve();
    //     //     }
    //     //
    //     //     const user = await getUser(req.body.user_id);
    //     //     console.log("USER", user);
    //     //     if (!user) {
    //     //         registerUser(req.body).then((user) => {
    //     //             console.log("USER ADDED TO DB");
    //     //         });
    //     //         res.status(200).end();
    //     //         return resolve();
    //     //     } else {
    //     //         res.status(200).end();
    //     //         return resolve();
    //     //     }
    //     // } else if (req.method === "PUT" && session) {
    //     //     editUser(req.body).then((user) => {
    //     //         console.log("USER UPDATED");
    //     //     });
    //     //     res.status(200).end();
    //     //     return resolve();
    //     // } else {
    //     //     res.setHeader("Allow", ["GET"]);
    //     //     res.status(405).end(`Method  Not Allowed`);
    //     //     return resolve();
    //     // }
    // })
}