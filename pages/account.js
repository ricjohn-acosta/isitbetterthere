import React from "react";
import Layout from "../components/Layout/Layout";
import Account from "../containers/Account";
import { getSession } from "next-auth/client";
import { getUser, getUserExperiences} from "../server/db";

const account = (props) => {
  return (
    <Layout>
      <Account {...props} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userContributions = await getUserExperiences(session.account.id)

  
  let user = null;
  if (session) {
    user = await getUser(session.account.id);
  } else {
    context.res.writeHead(302, {
      Location:
        process.env.NODE_ENV === "production"
          ? process.env.prod + "/signup"
          : process.env.dev + "/signup",
    });
    context.res.end();
  }

  return {
    props: {
      session,
      user,
      userContributions,
    },
  };
}

export default account;
