import {useRouter} from "next/router";
import Transition from "../containers/Transition";
import Layout from "../components/Layout/Layout";
import PageNotFound from "../containers/PageNotFound";
import {getSession} from "next-auth/client";
import {getTransitionExperiences, getTransitionExperiencesCount} from "../server/models/experiences";
import {axiosGetUserById} from "./api/users/[id]";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {storeUserData} from "../store/actions/api/users";

const transition = ({
                        session,
                        experiences,
                        totalExperiences,
                        allExperiences,
                        ratedExperiences,
                        reportedExperiences,
                        userData
                    }) => {
    const router = useRouter();
    const {from, to, category} = router.query;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(storeUserData(userData))
    }, [])

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
    const from = context.query.from;
    const to = context.query.to;
    const page = context.query.page;
    const limit = 6;
    let res = null;

    if (session) {
        res = await axiosGetUserById(session.id)
    }

    const experiences = await getTransitionExperiences(from, to, page, limit).then(data => {
        return JSON.parse(JSON.stringify(data))
    });

    const totalExperiences = await getTransitionExperiencesCount(from, to)

    return {
        props: {
            experiences: experiences,
            totalExperiences,
            allExperiences: experiences,
            userData: res ? res.data[0] : null
        },
    };
}

export default transition;
