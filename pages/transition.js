import { useRouter } from "next/router";
import Transition from "../containers/Transition";
import Layout from "../components/Layout/Layout";
import PageNotFound from "../containers/PageNotFound";
import { session } from "next-auth/client";
import { getExperiences, getAllExperiences } from "../server/db";

const transition = ({
  session,
  experiences,
  totalExperiences,
  allExperiences,
}) => {
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
            totalExperiences={totalExperiences}
            allExperiences={allExperiences}
          />
        </Layout>
      </>
    );
  }
};

export async function getServerSideProps(context) {
  // returns an array of experiences
  console.log("SORT BY QUERY ", context.query.sortBy)
  const experiences = await getExperiences(
    context.query.from,
    context.query.to,
    context.query.page,
    context.query.filterBy
  );

  console.log("EXPERIENCES ", experiences)
  const allExperiences = await getAllExperiences(
    context.query.from,
    context.query.to
  );

  return {
    props: {
      session: await session(context),
      experiences: experiences[0],
      totalExperiences: experiences[1],
      allExperiences,
    },
  };
}

export default transition;
