import React, {useEffect} from "react";
import Layout from "../components/Layout/Layout";
import Account from "../containers/Account";
import {getSession} from "next-auth/client";
import {storeUserData} from "../store/actions/api/users";
import {useDispatch} from "react-redux";
import {axiosGetUserById} from "./api/users/[id]";
import serverRedirect from "../utils/serverRedirect";

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
    // const redirectToSignup = {
    //     destination: '/signup',
    //     permanent: false
    // }
    // const redirectToAccountSetup = {
    //     destination: '/account-setup',
    //     permanent: false
    // }
    const session = await getSession(context);
    let user = null;
    //
    // if (!session) {
    //     context.res.end()
    //     return {redirect: redirectToSignup}
    // }
    //
    // const res = await axiosGetUserById(session.id)
    //
    // if (res.data === 'Not found') {
    //     context.res.end()
    //     return {redirect: redirectToAccountSetup}
    // }
    //
    // context.res.end()

    if (!session) {
        serverRedirect("/signup")
    }

    if (session) {
        user = await axiosGetUserById(session.id)
        user && serverRedirect("/signup")
    }


    return {
        props: {
            userData: (!user || user.data === 'Not found') ? null : user.data[0]
        },
    };

}

export default account;
