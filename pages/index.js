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

  // if (typeof window === "undefined" && context.res.writeHead) {
  //   context.res.writeHead(302, {
  //     Location: "https://www.isitbetterthere.com" + context.req.url,
  //   });
  //   context.res.end();
  // }

  console.log("REQ HEADERS HOST", context.req.headers.host)
  return {
    props: {
      session: await getSession(context),
      contributionCount,
    },
  };
}

export default Index;
