import Home from "../containers/Home";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/client";
import { getTotalContributions } from "../server/db";
import { useRouter } from "next/router";

const Index = (props) => {
  return (
    <Layout>
      <Home {...props} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const allUserExperience = await getTotalContributions();
  let contributionCount = allUserExperience.length;

  return {
    props: {
      session: await getSession(context),
      contributionCount,
    },
  };
}

export default Index;
