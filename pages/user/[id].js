import Layout from "../components/Layout/Layout";
import { getUser } from "../server/db";

const User = () => {
  return <Layout>test</Layout>;
};
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default User;
