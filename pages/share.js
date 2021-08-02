import React, {useEffect} from "react";
import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import {getSession} from "next-auth/client";
import {storeUserData} from "../store/actions/api/users";
import {useDispatch} from "react-redux";
import {axiosGetUserById} from "./api/users/[id]";
import serverRedirect from "../utils/serverRedirect";
import {resetShareStoryForm} from "../store/actions/ui/shareStory";

const share = ({userData, hasRedirected}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(storeUserData(userData))
    }, [])

    useEffect(() => {
        if (!hasRedirected) return
        dispatch(resetShareStoryForm())
    }, [hasRedirected])

    return (
        <Layout>
            <Share/>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);
    let user = null;
    let hasRedirected = false;
    if (!session) {
        // serverRedirect(context.res, "/signup")
        hasRedirected = true;
        return {
            redirect: {
                destination: '/signup',
                permanent: false,
            },
        }
    }

    if (session) {
        user = await axiosGetUserById(session.id)
        if (user.data === 'Not found') {
            hasRedirected = true;
            return {
                redirect: {
                    destination: '/account-setup',
                    permanent: false,
                },
            }
        }
        // user.data === 'Not found' && serverRedirect(context.res, "/account-setup")
    }

    return {
        props: {
            userData: (!user || user.data === 'Not found') ? null : user.data[0],
            hasRedirected: hasRedirected
        },
    };
}

export default share;
