import React, {useEffect} from "react";
import Layout from "../components/Layout/Layout";
import Account from "../containers/Account";
import {getSession} from "next-auth/client";
import {storeUserData} from "../store/actions/users";
import {useDispatch} from "react-redux";
import {axiosGetUserById} from "./api/users/[id]";

const account = ({userData}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(storeUserData(userData))

    }, [])

    return (
        <Layout>
            <Account/>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const res = await axiosGetUserById(session.id)
    console.log(res)
    const redirectToSignup = {
        destination: '/signup',
        permanent: false
    }
    const redirectToAccountSetup = {
        destination: '/account-setup',
        permanent: false
    }

    if (!session && res.data === 'Not found') return {redirect: redirectToSignup}

    if (session && res.data === 'Not found') return {redirect: redirectToAccountSetup}

    return {
        props: {
            userData: res.data[0]
        },
    };
}

export default account;
