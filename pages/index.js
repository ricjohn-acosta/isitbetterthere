import Home from "../containers/Home";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/client";
import { getAllUserExperiences } from "../server/db";
import { useRouter } from "next/router";

const Index = (props) => {
  return (
    <Layout>
      <Home {...props} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const allUserExperience = await getAllUserExperiences();
  let contributionCount = allUserExperience.length;
  let herokuDomain = "isitbetterthere.herokuapp.com";
  let customDomain = "https://www.isitbetterthere.com";

  if (typeof window === "undefined" && context.res.writeHead) {
    if (context.req.headers.host === herokuDomain) {
      context.res.writeHead(302, {
        Location: customDomain + context.req.url,
      });
      context.res.end();
    }
  }

  return {
    props: {
      session: await getSession(context),
      contributionCount,
    },
  };
}

export default Index;
