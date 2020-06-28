import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/client";
import { getUsers } from "../server/db";

const share = ({ session }) => {
  return (
    <Layout>
      <Share session={session} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const users = await getUsers();

  const findUserInDatabase = () => {
    let found = false;
    console.log("test");

    if (session) {
      users.forEach((user) => {
        if (user.user_id === session.account.id) {
          found = true;
        }
      });
    } else {
      found = false;
    }
    return found;
  };
  // : process.env.NODE_ENV === "production" ? process.env.prod + "/#/howitworks" : process.env.dev + "/#/howitworks"
  if (typeof window === "undefined" && context.res.writeHead) {
    if (!session) {
      context.res.writeHead(302, {
        Location:
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/api/auth/signin"
            : process.env.dev + "/api/auth/signin",
      });
      context.res.end();
    } else if (session && !findUserInDatabase()) {
      context.res.writeHead(302, {
        Location:
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/account-setup"
            : process.env.dev + "/account-setup",
      });
      context.res.end();
    }

    // if (!findUserInDatabase()) {
    //   context.res.writeHead(302, { Location: "http://localhost:3000/account-setup" });
    //   context.res.end();
    // }
  }

  return {
    props: {
      session: session,
    },
  };
}

export default share;
