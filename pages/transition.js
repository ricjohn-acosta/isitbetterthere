import { useRouter } from "next/router";
import Transition from "../containers/Transition";
import Layout from "../components/Layout/Layout";
import PageNotFound from "../containers/PageNotFound";
import { session, getSession } from "next-auth/client";
import {
  getExperiences,
  getAllExperiences,
  getRatedExperiences,
  getReportedExperiences,
} from "../server/db";

const transition = ({
  session,
  experiences,
  totalExperiences,
  allExperiences,
  ratedExperiences,
  reportedExperiences,
}) => {
  const router = useRouter();
  const { from, to, category } = router.query;
  console.log("EXPEEERIENCES!! ", experiences);
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
            ratedExperiences={ratedExperiences}
            reportedExperiences={reportedExperiences}
          />
        </Layout>
      </>
    );
  }
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let ratedExperiences = null;
  let reportedExperiences = null;
  // returns an array of experiences
  console.log("SORT BY QUERY ", context.query.sortBy);
  const experiences = await getExperiences(
    context.query.from,
    context.query.to,
    context.query.page,
    context.query.sortBy,
    context.query.filterBy
  );

  const allExperiences = await getAllExperiences(
    context.query.from,
    context.query.to
  );

  if (session) {
    ratedExperiences = await getRatedExperiences(session.id);
    reportedExperiences = await getReportedExperiences(session.id);
  }

  // if (typeof window === "undefined" && context.res.writeHead) {
  //   context.res.writeHead(302, {
  //     Location: "https://www.isitbetterthere.com" + context.req.url,
  //   });
  //   context.res.end();
  // }

  return {
    props: {
      session,
      experiences: experiences[0],
      totalExperiences: experiences[1],
      allExperiences,
      ratedExperiences,
      reportedExperiences,
    },
  };
}

export default transition;
