import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import { session } from "next-auth/client";

const share = ({ session }) => {
  return (
    <Layout>
      <Share session={session} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await session(context),
    },
  };
}

export default share;
