import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/client";
import { getUserExperiences, getUser } from "../server/db";

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
  let herokuDomain = "isitbetterthere.herokuapp.com";
  let customDomain = "https://www.isitbetterthere.com";

  const signedOutRedirect = () => {
    if (context.req.headers.host === herokuDomain) {
      context.res.writeHead(302, {
        Location: customDomain + context.req.url,
      });
      context.res.end();
    } else {
      context.res.writeHead(302, {
        Location:
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/signup"
            : process.env.dev + "/signup",
      });
      context.res.end();
    }
  };

  const signedInRedirect = async () => {
    if (!(await getUser(session.id))) {
      if (context.req.headers.host === herokuDomain) {
        context.res.writeHead(302, {
          Location: customDomain + context.req.url,
        });
        context.res.end();
      } else {
        context.res.writeHead(302, {
          Location:
            process.env.NODE_ENV === "production"
              ? process.env.prod + "/account-setup"
              : process.env.dev + "/account-setup",
        });
        context.res.end();
      }
    }
    userExperiences = await getUserExperiences(session.id);
  };

  if (typeof window === "undefined" && context.res.writeHead) {
    !session && signedOutRedirect();
    session && await signedInRedirect();
  }

  return {
    props: {
      session,
      userExperiences,
    },
  };
}

export default share;
