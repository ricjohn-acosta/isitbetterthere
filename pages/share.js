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
  const userExperiences = await getUserExperiences(session.id);

  return {
    props: {
      session,
      userExperiences,
    },
  };
}

export default share;
