import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/client";
import { getUsers, getUser } from "../server/db";

const share = ({ session }) => {
  return (
    <Layout>
      <Share session={session} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userExists = await getUser(session.account.id);
  if (typeof window === "undefined" && context.res.writeHead) {
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
      }
    }
  }

  return {
    props: {
      session: session,
    },
  };
}

export default share;
