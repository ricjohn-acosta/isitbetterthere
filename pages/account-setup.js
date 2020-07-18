import AccountSetup from "../containers/AccountSetup";
import Layout from "../components/Layout/Layout";
import { session, getSession } from "next-auth/client";
import PageNotFound from "../containers/PageNotFound";
import { getUsers } from "../server/db";

// CLIENT SIDE
const accountSetup = ({ session, users }) => {
  if (!session) {
    return (
      <Layout>
        <PageNotFound session={session} users={users} />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <AccountSetup session={session} users={users} />
      </Layout>
    );
  }
};

// SERVER SIDE
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

  if (typeof window === "undefined" && context.res.writeHead) {
    if (findUserInDatabase()) {
      context.res.writeHead(302, {
        Location:
          process.env.NODE_ENV === "production"
            ? process.env.prod
            : process.env.dev,
      });
      context.res.end();
    } else if (!session) {
      context.res.writeHead(302, {
        Location:
          process.env.NODE_ENV === "production"
            ? process.env.prod
            : process.env.dev,
      });
      context.res.end();
    }
  }

  return {
    props: {
      session,
      users,
    },
  };
}

export default accountSetup;
