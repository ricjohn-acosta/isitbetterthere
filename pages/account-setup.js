import AccountSetup from "../containers/AccountSetup";
import Layout from "../components/Layout/Layout";
import { session } from "next-auth/client";
import PageNotFound from "../containers/PageNotFound";
import { getUsers } from "../server/db";
import Router from "next/router";
import { useEffect } from "react";

const accountSetup = ({ session, users }) => {
  // const findUserInDatabase = () => {
  //   let found = false;
  //   console.log("test");
  //   users.forEach((user) => {
  //     if (user.uid === session.user.uid) {
  //       found = true;
  //     }
  //   });
  //   return found;
  // };

  // console.log(findUserInDatabase());

  useEffect(() => {
    if (session && users) {
      users.forEach((user) => {
        if (user.uid === session.user.uid) {
          Router.push("/")
        }
      });
    }
  }, []);

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

export async function getServerSideProps(context) {
  const users = await getUsers();

  return {
    props: {
      session: await session(context),
      users,
    },
  };
}

export default accountSetup;
