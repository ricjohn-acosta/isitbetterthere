import {useRouter} from "next/router";
import Transition from "../containers/Transition";
import Layout from "../components/Layout/Layout";
import PageNotFound from "../containers/PageNotFound";
import {getSession} from "next-auth/client";
import {getTransitionExperiences, getTransitionExperiencesCount} from "../server/models/experiences";

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

    const experiences = await getTransitionExperiences(context.query.from, context.query.to).then(data => {
        return JSON.parse(JSON.stringify(data))
    });

    const totalExperiences = await getTransitionExperiencesCount(context.query.from, context.query.to)

    return {
        props: {
            experiences: experiences,
            totalExperiences,
            allExperiences: experiences,
        },
    };
}

export default transition;
