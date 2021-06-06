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
        if (!session) {
            router.push("/signup")
        } else {
            dispatch(getUser(session.id)).then(userData => {
                userData.data !== 'Not found' ? setUserData(userData) : router.push('/account-setup')
            })
        }
    }, [session])

    if (!userData) return null

    return (
        <Layout>
            <Account userData={userData}/>
        </Layout>
    );
};

// export async function getServerSideProps(context) {
//     await dbConnect();
//     const session = await getSession(context);
//     let userContributions = null;
//     let user = null;
//     let helpfulContributions = null;
//
//     if (!session) {
//         // Redirect to signup if no session
//         context.res.writeHead(302, {
//             Location:
//                 process.env.NODE_ENV === "production"
//                     ? process.env.prod + "/signup"
//                     : process.env.dev + "/signup",
//         });
//         context.res.end();
//     } else {
//         // Get user data if there is session
//         const fetchedUser = await getUserById(session.id)
//
//         if (!fetchedUser) {
//             context.res.writeHead(302, {
//                 Location:
//                     process.env.NODE_ENV === "production"
//                         ? process.env.prod + "/account-setup"
//                         : process.env.dev + "/account-setup",
//             });
//             context.res.end();
//         } else {
//             user = JSON.parse(JSON.stringify(fetchedUser));
//             userContributions = await getUserExperiences(session.id).then(data => {
//                 return JSON.parse(JSON.stringify(data))
//             })
//             helpfulContributions = await getUserRatedExperiences(session.id);
//         }
//     }
//
//     return {
//         props: {
//             session,
//             user,
//             userContributions,
//             helpfulContributions,
//         },
//     };
// }

export default account;
