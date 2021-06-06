import React, {useEffect, useState} from "react";
import AccountSetup from "../containers/AccountSetup";
import Layout from "../components/Layout/Layout";
import {useSession} from "next-auth/client";
import PageNotFound from "../containers/PageNotFound";
import {useDispatch} from 'react-redux'
import {getUser} from "../store/actions/users";
import {useRouter} from "next/router";

// CLIENT SIDE
const accountSetup = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [session, loading] = useSession();
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        if (loading) return

        if (!session) {
            router.push('/account')
        } else {
            setTransitioning(true)
            dispatch(getUser(session.id)).then(userData => {
                userData.data !== 'Not found' && router.push('/account')
                setTransitioning(false)
            })
        }
    }, [session, loading, transitioning])

    if (!session || transitioning) {
        return (
            <Layout>
                <PageNotFound/>
            </Layout>
        );
    }

    return (
        <Layout>
            <AccountSetup/>
        </Layout>
    );
};

export default accountSetup;
