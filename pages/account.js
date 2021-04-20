import React from "react";
import Layout from "../components/Layout/Layout";
import Account from "../containers/Account";
import {getSession} from "next-auth/client";
import {
    getUser,
    getUserExperiences,
    getUserRatedExperiences,
} from "../server/db";
import {getUserBySessionId} from "../server/user/userDb";

const account = (props) => {
    return (
        <Layout>
            <Account {...props} />
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);
    let user = null;
    let userContributions = null;
    let helpfulContributions = null;

    if (!session) {
        context.res.writeHead(302, {
            Location:
                process.env.NODE_ENV === "production"
                    ? process.env.prod + "/signup"
                    : process.env.dev + "/signup",
        });
        context.res.end();
    }

    if (session) {
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
            userContributions = await getUserExperiences(session.id);
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
