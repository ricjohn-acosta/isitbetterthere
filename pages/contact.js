import Layout from "../components/Layout/Layout";
import Contact from "../containers/Contact";
import { getSession } from "next-auth/client";

const contact = () => {
  return (
    <Layout>
      <Contact />
    </Layout>
  );
};

export default contact;
