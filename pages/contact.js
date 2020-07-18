import Layout from "../components/Layout/Layout";
import Contact from "../containers/Contact";
import { getSession } from "next-auth/client";

const contact = (props) => {
    return (
        <Layout>
            <Contact {...props}/>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
      props: {
        session,
      },
    };
  }

export default contact;