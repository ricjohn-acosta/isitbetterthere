import { useRouter } from "next/router";
import Transition from "../containers/Transition";
import Layout from "../components/Layout/Layout";
import PageNotFound from "../containers/PageNotFound";
import { session } from "next-auth/client";
import { getExperiences } from "../server/db";

const transition = ({ session, experiences }) => {
  const router = useRouter();
  const { from, to, category } = router.query;

  if (Object.keys(router.query).length === 0) {
    return (
      <Layout>
        <PageNotFound />
      </Layout>
    );
  } else {
    return (
      <>
        <Layout>
          <Transition
            from={from}
            to={to}
            category={category}
            session={session}
            experiences={experiences}
          />
        </Layout>
      </>
    );
  }
};

export async function getServerSideProps(context) {

  // returns an array of experiences
  const experiences = await getExperiences(
    context.query.from,
    context.query.to
  );

  console.log(experiences);
  return {
    props: {
      session: await session(context),
      experiences,
    },
  };
}

export default transition;
