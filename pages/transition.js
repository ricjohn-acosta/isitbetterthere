import {useRouter} from "next/router";
import Transition from "../containers/Transition";
import Layout from "../components/Layout/Layout";
import PageNotFound from "../containers/PageNotFound";
import {session, getSession} from "next-auth/client";
import {
    getExperiences,
    getTransitionExperiences,
    getRatedExperiences,
    getReportedExperiences,
} from "../server/db";
import {
    getTotalNumberOfExperiences,
    getTransitionExperiencesCount,
    getTransitionExperiencesTest
} from "../server/models/experiences";

const transition = ({
                        session,
                        experiences,
                        totalExperiences,
                        allExperiences,
                        ratedExperiences,
                        reportedExperiences,
                    }) => {
    const router = useRouter();
    const {from, to, category} = router.query;
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
    // let ratedExperiences = null;
    // let reportedExperiences = null;

    const experiences = await getTransitionExperiencesTest(context.query.from, context.query.to).then(data => {
        return JSON.parse(JSON.stringify(data))
    });

    const totalExperiences = await getTransitionExperiencesCount(context.query.from, context.query.to)
    console.log('totalExperiences', totalExperiences)

    // console.log('test', test)

    // const experiences = await getExperiences(
    //     context.query.from,
    //     context.query.to,
    //     context.query.page,
    //     context.query.sortBy,
    //     context.query.filterBy
    // );

    // if (session) {
    //     ratedExperiences = await getRatedExperiences(session.id);
    //     reportedExperiences = await getReportedExperiences(session.id);
    // }

    console.log(experiences)
    return {
        props: {
            session,
            experiences: experiences,
            totalExperiences,
            allExperiences: experiences,
            // ratedExperiences,
            // reportedExperiences,
        },
    };
}

export default transition;
