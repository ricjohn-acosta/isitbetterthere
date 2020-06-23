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
    users.forEach((user) => {
      if (user.uid === session.user.uid) {
        found = true;
      }
    });
    return found;
  };

  if (typeof window === "undefined" && context.res.writeHead) {
    if(findUserInDatabase()) {
      context.res.writeHead(302, {Location: "http://localhost:3000/"})
      context.res.end()
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
