import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";

const share = () => {
  return (
    <Layout>
      <Share/>
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
