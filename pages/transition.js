import { useRouter } from "next/router";
import Transition from "../containers/Transition";
import Layout from "../components/Layout/Layout";
import PageNotFound from "../containers/PageNotFound"
import { session } from "next-auth/client";

const transition = ({ session }) => {
  const router = useRouter();
  const { from, to, category } = router.query;

  if (Object.keys(router.query).length === 0) {
    return (
      <Layout>
        <PageNotFound/>
      </Layout>
    );
  } else {
    return (
      <>
        <Layout>
          <Transition from={from} to={to} category={category} session={session}/>
        </Layout>
      </>
    );
  }
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await session(context),
    },
  };
}

export default transition;
