import Layout from "../components/Layout/Layout";
import Contact from "../containers/Contact";
import { getSession } from "next-auth/client";

const contact = (props) => {
  return (
    <Layout>
      <Contact {...props} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let herokuDomain = "isitbetterthere.herokuapp.com";
  let customDomain = "https://www.isitbetterthere.com";

  if (typeof window === "undefined" && context.res.writeHead) {
    if (context.req.headers.host === herokuDomain) {
      context.res.writeHead(302, {
        Location: customDomain + context.req.url,
      });
      context.res.end();
    }
  }

  return {
    props: {
      session,
    },
  };
}

export default contact;
