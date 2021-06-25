import React, {useEffect, useState} from "react";
import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import {getSession, useSession} from "next-auth/client";
import {getUser, storeUserData} from "../store/actions/users";
import {useDispatch} from "react-redux";
import redirect from "nextjs-redirect";
import {axiosGetUserById} from "./api/users/[id]";

const share = ({userData}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(storeUserData(userData))
    }, [])

    return (
        <Layout>
            <Share/>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const redirectToSignup = {
        destination: '/signup',
        permanent: false
    }
    const redirectToAccountSetup = {
        destination: '/account-setup',
        permanent: false
    }
    const session = await getSession(context);

    if (!session) return {redirect: redirectToSignup}

    const res = await axiosGetUserById(session.id)

    if (res.data === 'Not found') return {redirect: redirectToAccountSetup}

    return {
        props: {
            userData: res.data === 'Not found' ? null : res.data[0]
        },
    };
}

export default share;
