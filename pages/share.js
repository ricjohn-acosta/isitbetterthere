import Share from "../containers/Share";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/client";

const share = ({ session }) => {
  return (
    <Layout>
      <Share session={session} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (typeof window === "undefined" && context.res.writeHead) {
    if(!session) {
      context.res.writeHead(302, {Location: "http://localhost:3000/signup"})
      context.res.end()
    }
  }

  return {
    props: {
      session: session,
    },
  };
}

export default share;
