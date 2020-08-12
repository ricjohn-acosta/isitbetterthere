import Layout from "../../components/Layout/Layout";
import Router from "next/router";
import { getUser, getUserExperiences } from "../../server/db";

const User = ({}) => {
  return (
    <Layout>
        {Router.query.story}
    </Layout>
  );
};
export async function getServerSideProps(context) {
}

export default User;
