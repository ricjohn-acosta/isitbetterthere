import React, {useEffect} from "react";
import AccountSetup from "../containers/AccountSetup";
import Layout from "../components/Layout/Layout";
import {getSession} from "next-auth/client";
import {useDispatch} from 'react-redux'
import {storeUserData} from "../store/actions/users";
import {axiosGetUserById} from "./api/users/[id]";

const accountSetup = ({userData}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(storeUserData(userData))
    }, [])

    return <Layout>
        <AccountSetup/>
    </Layout>
};

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const res = await axiosGetUserById(session.id)
    const redirectToSignup = {
        destination: '/signup',
        permanent: false
    }
    const redirectToAccount = {
        destination: '/account',
        permanent: false
    }

    if (!session && res.data === 'Not found') return {redirect: redirectToSignup}

    if (session && res.data !== 'Not found') return {redirect: redirectToAccount}

    return {
        props: {
            userData: res.data[0]
        },
    };
}

export default accountSetup;
