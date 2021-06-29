import React, {useEffect} from "react";
import AccountSetup from "../containers/AccountSetup";
import Layout from "../components/Layout/Layout";
import {getSession} from "next-auth/client";
import {useDispatch} from 'react-redux'
import {storeUserData} from "../store/actions/api/users";
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
    const redirectToSignup = {
        destination: '/signup',
        permanent: false
    }
    const redirectToAccount = {
        destination: '/account',
        permanent: false
    }
    const session = await getSession(context);

    if (!session) {
        context.res.end()
        return {redirect: redirectToSignup}
    }

    const res = await axiosGetUserById(session.id)

    if (res.data !== 'Not found') {
        context.res.end()
        return {redirect: redirectToAccount}
    }

    return {
        props: {
            userData: res.data === 'Not found' ? null : res.data[0]
        },
    };
}

export default accountSetup;
