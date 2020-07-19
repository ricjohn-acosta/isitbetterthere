import React from "react";
import Layout from "../components/Layout/Layout";
import Account from "../containers/Account";
import { getSession } from "next-auth/client";
import {
  getUser,
  getUserExperiences,
  getUserRatedExperiences,
} from "../server/db";

const account = (props) => {
  return (
    <Layout>
      {/* <Account {...props} /> */}
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   let user = null;
//   let userContributions = null;
//   let helpfulContributions = null;

//   if (typeof window === "undefined" && context.res.writeHead) {
//     if (!session) {
//       context.res.writeHead(302, {
//         Location:
//           process.env.NODE_ENV === "production"
//             ? process.env.prod + "/signup"
//             : process.env.dev + "/signup",
//       });
//       context.res.end();
//     }

//     if (session) {
//       if (!(await getUser(session.id))) {
//         context.res.writeHead(302, {
//           Location:
//             process.env.NODE_ENV === "production"
//               ? process.env.prod + "/account-setup"
//               : process.env.dev + "/account-setup",
//         });
//         context.res.end();
//       } else {
//         user = await getUser(session.id);
//         userContributions = await getUserExperiences(session.id);
//         helpfulContributions = await getUserRatedExperiences(session.id);
//       }
//     }
//   }

//   return {
//     props: {
//       session,
//       user,
//       userContributions,
//       helpfulContributions,
//     },
//   };
// }

export default account;
