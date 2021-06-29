import React, {useEffect} from "react";
import Layout from "../components/Layout/Layout";
import Account from "../containers/Account";
import {getSession} from "next-auth/client";
import {storeUserData} from "../store/actions/api/users";
import {useDispatch} from "react-redux";
import {axiosGetUserById} from "./api/users/[id]";

const account = ({userData}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(storeUserData(userData))

    }, [])

    return (
        <Layout>
            <Account userData={userData}/>
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

    if (!session) {
        context.res.end()
        return {redirect: redirectToSignup}
    }

    const res = await axiosGetUserById(session.id)

    if (res.data === 'Not found') {
        context.res.end()
        return {redirect: redirectToAccountSetup}
    }

    context.res.end()

    return {
        props: {
            userData: res.data === 'Not found' ? null : res.data[0]
        },
    };

}

export default account;
