import React, {useEffect} from "react";
import AccountSetup from "../containers/AccountSetup";
import Layout from "../components/Layout/Layout";
import {getSession} from "next-auth/client";
import {useDispatch} from 'react-redux'
import {storeUserData} from "../store/actions/api/users";
import {axiosGetUserById} from "./api/users/[id]";
import serverRedirect from "../utils/serverRedirect";

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
    let user = null;
    if (!session) {
        serverRedirect(context.res, "/signup")
    }

    if (session) {
        user = await axiosGetUserById(session.id)
        user.data !== 'Not found' && serverRedirect(context.res, "/account")
    }

    return {
        props: {
            userData: (!user || user.data === 'Not found') ? null : user.data[0]
        },
    };
}

export default accountSetup;
