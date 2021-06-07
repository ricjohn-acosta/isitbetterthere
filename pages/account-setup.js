import React, {useEffect, useState} from "react";
import AccountSetup from "../containers/AccountSetup";
import Layout from "../components/Layout/Layout";
import {useSession} from "next-auth/client";
import {useDispatch} from 'react-redux'
import {getUser} from "../store/actions/users";
import redirect from 'nextjs-redirect'

const accountSetup = () => {
    const dispatch = useDispatch()
    const [session, loading] = useSession();
    const [userData, setUserData] = useState(null);
    const RedirectToAccount = redirect('/account')
    const RedirectToSignup = redirect('/signup')

    useEffect(() => {
        if (!session) return
        dispatch(getUser(session.id)).then(userData => {
            setUserData(userData)
        })
    }, [session])


    if (!session && (userData && userData.data === 'Not found')) return <RedirectToSignup/>
    if (session && (userData && userData.data !== 'Not found')) return <RedirectToAccount/>

    return <Layout>
        <AccountSetup/>
    </Layout>
};

export default accountSetup;
