import React, {useEffect} from "react";
import Layout from "../components/Layout/Layout";
import Account from "../containers/Account";
import {getSession} from "next-auth/client";
import {getUserRatedExperiences,} from "../server/db";
import {getUserBySessionId} from "../server/models/user";
import {storeUserData} from "../store/actions/users";
import {useDispatch} from "react-redux";
import dbConnect from "../server/mongodbConnect";
import {getUserExperiences} from "../server/models/experiences";

const account = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(storeUserData({experiences: props.userContributions}))
    }, [dispatch])

    return (
        <Layout>
            <Account {...props} />
        </Layout>
    );
};

export async function getServerSideProps(context) {
    await dbConnect();
    const session = await getSession(context);
    const userContributions = await getUserExperiences(session.id)

    let user = null;
    // let userContributions = null;
    let helpfulContributions = null;

    if (!session) {
        // Redirect to signup if no session
        context.res.writeHead(302, {
            Location:
                process.env.NODE_ENV === "production"
                    ? process.env.prod + "/signup"
                    : process.env.dev + "/signup",
        });
        context.res.end();
    } else {
        // Get user data if there is session
        const fetchedUser = await getUserBySessionId(session.id)

        if (!fetchedUser) {
            context.res.writeHead(302, {
                Location:
                    process.env.NODE_ENV === "production"
                        ? process.env.prod + "/account-setup"
                        : process.env.dev + "/account-setup",
            });
            context.res.end();
        } else {
            user = JSON.parse(JSON.stringify(fetchedUser));
            // userContributions = await getUserExperiences(session.id);
            helpfulContributions = await getUserRatedExperiences(session.id);
        }
    }

    return {
        props: {
            session,
            user,
            userContributions,
            helpfulContributions,
        },
    };
}

export default account;
