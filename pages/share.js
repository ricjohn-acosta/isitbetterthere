import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import {getUserById} from "../server/models/user";
import {getUserExperiences} from "../server/models/experiences";
import {getSession} from "next-auth/client";

const share = () => {
  return (
    <Layout>
      <Share/>
    </Layout>
  );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);
    let userExperiences = null;

    const signedOutRedirect = () => {
        context.res.writeHead(302, {
            Location:
                process.env.NODE_ENV === "production"
                    ? process.env.prod + "/signup"
                    : process.env.dev + "/signup",
        });
        context.res.end();
    };

    if (!session) {
        signedOutRedirect()
    } else {
        if (!(await getUserById(session.id))) {
            context.res.writeHead(302, {
                Location:
                    process.env.NODE_ENV === "production"
                        ? process.env.prod + "/account-setup"
                        : process.env.dev + "/account-setup",
            });
            context.res.end();
        } else {
            userExperiences = await getUserExperiences(session.id).then(data => {
                return JSON.parse(JSON.stringify(data))
            });
            return {
                props: {userExperiences}
            }
        }
    }
}


export default share;
