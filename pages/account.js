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
      <Account {...props} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let user = null;
  let userContributions = null;
  let helpfulContributions = null;

  // if (session) {
  //   user = await getUser(session.account.id);
  //   userContributions = await getUserExperiences(session.account.id);
  //   helpfulContributions = await getUserRatedExperiences(session.account.id);
  // } else {
  //   context.res.writeHead(302, {
  //     Location:
  //       process.env.NODE_ENV === "production"
  //         ? process.env.prod + "/signup"
  //         : process.env.dev + "/signup",
  //   });
  //   context.res.end();
  // }

  // if (!session) {
  //   context.res.writeHead(302, {
  //     Location:
  //       process.env.NODE_ENV === "production"
  //         ? process.env.prod + "/signup"
  //         : process.env.dev + "/signup",
  //   });
  //   context.res.end();
  // } else if (session && !userExists) {
  //   context.res.writeHead(302, {
  //     Location:
  //       process.env.NODE_ENV === "production"
  //         ? process.env.prod + "/account-setup"
  //         : process.env.dev + "/account-setup",
  //   });
  //   context.res.end();
  // } else {
  //   user = await getUser(session.account.id);
  //   userContributions = await getUserExperiences(session.account.id);
  //   helpfulContributions = await getUserRatedExperiences(session.account.id);
  // }

  if (!session) {
    context.res.writeHead(302, {
      Location:
        process.env.NODE_ENV === "production"
          ? process.env.prod + "/signup"
          : process.env.dev + "/signup",
    });
    context.res.end();
  }

  if (session) {
    if (!(await getUser(session.account.id))) {
      context.res.writeHead(302, {
        Location:
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/account-setup"
            : process.env.dev + "/account-setup",
      });
      context.res.end();
    } else {
      user = await getUser(session.account.id);
      userContributions = await getUserExperiences(session.account.id);
      helpfulContributions = await getUserRatedExperiences(session.account.id);
    }
  }

  return {
    props: {
      session,
      user,
      userContributions,
      helpfulContributions,
    },
  };
}

export default account;
