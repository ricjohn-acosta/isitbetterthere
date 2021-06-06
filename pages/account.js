import React, {useEffect, useState} from "react";
import Layout from "../components/Layout/Layout";
import Account from "../containers/Account";
import {useSession} from "next-auth/client";
import {getUser} from "../store/actions/users";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

const account = (props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [session, loading] = useSession();
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (loading) return

        if (!session) {
            router.push("/signup")
        } else {
            dispatch(getUser(session.id)).then(userData => {
                console.log('userdata', userData)
                userData.data === 'Not found' ? router.push('/account-setup') : setUserData(userData)
            })
        }
    }, [session, loading])

    if (!userData) return null

    return (
        <Layout>
            <Account userData={userData}/>
        </Layout>
    );
};

export default account;
