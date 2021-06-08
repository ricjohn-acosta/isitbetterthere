import React, {useEffect, useState} from "react";
import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import {useSession} from "next-auth/client";
import {getUser, storeUserData} from "../store/actions/users";
import {useDispatch} from "react-redux";
import redirect from "nextjs-redirect";

const share = () => {
    const dispatch = useDispatch()
    const [session, loading] = useSession();
    const [userData, setUserData] = useState(null)
    const RedirectToAccountSetup = redirect('/account-setup')
    const RedirectToSignup = redirect('/signup')

    useEffect(() => {
        if (!session) return
        dispatch(getUser(session.id)).then(userData => {
            setUserData(userData)
            dispatch(storeUserData(userData.data[0]))
        })
    }, [session])

    // if (!session && (userData && userData.data === 'Not found')) return <RedirectToSignup/>
    // if (session && (userData && userData.data === 'Not found')) return <RedirectToAccountSetup/>

    return (
        <Layout>
            <Share/>
        </Layout>
    );
};

export default share;
