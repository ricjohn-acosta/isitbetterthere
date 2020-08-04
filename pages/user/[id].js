import Layout from "../../components/Layout/Layout";
import UserView from "../../containers/UserView";
import { getUser } from "../../server/db";

const User = ({ user }) => {
  return (
    <Layout>
      <UserView user={user}/>
    </Layout>
  );
};
export async function getServerSideProps(context) {
  const user = await getUser(context.query.id);

  console.log("IUHAWDUIAD", user);
  return {
    props: {
      user,
    },
  };
}

export default User;
