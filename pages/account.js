import React from "react";
import Layout from "../components/Layout/Layout";
import Account from "../containers/Account";
import { getSession } from "next-auth/client";
import {
  getUser,
  getUserExperiences,
  getUserRatedExperiences,
} from "../server/db";

const account = (props) => {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(storeUserData({experiences: props.userContributions}))
    // }, [dispatch])

    return (
        <Layout>
            <Account {...props} />
        </Layout>
    );
};

export async function getServerSideProps(context) {
    await dbConnect();
    const session = await getSession(context);
    const userContributions = await getUserExperiences(session.id).then(data => {
        return JSON.parse(JSON.stringify(data))
    })

    console.log(userContributions)
    let user = null;
    // let userContributions = null;
    let helpfulContributions = null;

  if (session) {
    if (!(await getUser(session.id))) {
      context.res.writeHead(302, {
        Location:
          process.env.NODE_ENV === "production"
            ? process.env.prod + "/account-setup"
            : process.env.dev + "/account-setup",
      });
      context.res.end();
    } else {
      user = await getUser(session.id);
      userContributions = await getUserExperiences(session.id);
      helpfulContributions = await getUserRatedExperiences(session.id);
    }
  }

  return {
    props: {
      session,
      user,
      userContributions,
      helpfulContributions,
    },
  };
}

export default account;
