import Layout from "../../components/Layout/Layout";
import UserView from "../../containers/UserView";
import { getUser, getUserExperiences } from "../../server/db";

const User = ({ user, userExperiences }) => {
  return (
    <Layout>
      <UserView user={user} userExperiences={userExperiences}/>
    </Layout>
  );
};
export async function getServerSideProps(context) {
  const user = await getUser(context.query.id);
  const userExperiences = await getUserExperiences(context.query.id);

  console.log("IUHAWDUIAD", user);
  return {
    props: {
      user,
      userExperiences
    },
  };
}

export default User;
