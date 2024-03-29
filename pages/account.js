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
    const session = await getSession(context);
    let user = null;

    if (!session) {
        // serverRedirect(context.res, "/signup")
        return {
            redirect: {
                destination: '/signup',
                permanent: false,
            },
        }
    }

    if (session) {
        user = await axiosGetUserById(session.id)
        // user.data === 'Not found'  && serverRedirect(context.res, "/account-setup")
        if (user.data === 'Not found') {
            return {
                redirect: {
                    destination: '/account-setup',
                    permanent: false,
                },
            }
        }
    }


    return {
        props: {
            userData: (!user || user.data === 'Not found') ? null : user.data[0]
        },
    };

}

export default account;
