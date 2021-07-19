import React, {useEffect} from "react";
import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import {getSession} from "next-auth/client";
import {storeUserData} from "../store/actions/api/users";
import {useDispatch} from "react-redux";
import {axiosGetUserById} from "./api/users/[id]";
import serverRedirect from "../utils/serverRedirect";
import {resetShareStoryForm} from "../store/actions/ui/shareStory";

const share = ({userData, referer}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(storeUserData(userData))
    }, [])

    useEffect(() => {
        if (!referer) return
        dispatch(resetShareStoryForm())
    }, [referer])

    return (
        <Layout>
            <Share/>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);
    let user = null;
    if (!session) {
        serverRedirect(context.res, "/signup")
    }

    if (session) {
        user = await axiosGetUserById(session.id)
        user.data === 'Not found' && serverRedirect(context.res, "/account-setup")
    }

    return {
        props: {
            userData: (!user || user.data === 'Not found') ? null : user.data[0],
            referer: context.req.headers.referer
        },
    };
}

export default share;
