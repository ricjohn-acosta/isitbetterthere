import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/client";
import { getUserExperiences, getUser } from "../server/db";
import request from "superagent";

const share = (props) => {
  return (
    <Layout>
      <Share {...props} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userExperiences = null;

  const signedOutRedirect = () => {
    context.res.writeHead(302, {
      Location:
        process.env.NODE_ENV === "production"
          ? process.env.prod + "/signup"
          : process.env.dev + "/signup",
    });
    context.res.end();
  };

  const signedInRedirect = async () => {
    if (!(await getUser(session.id))) {
      context.res.writeHead(302, {
        Location:
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/account-setup"
            : process.env.dev + "/account-setup",
      });
      context.res.end();
    }
    userExperiences = await getUserExperiences(session.id);
  };

  if (typeof window === "undefined" && context.res.writeHead) {
    !session && signedOutRedirect();
    session && (await signedInRedirect());
  }

  return {
    props: {
      session,
      userExperiences,
    },
  };
}

export default share;
