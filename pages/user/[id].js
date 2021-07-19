import Layout from "../../components/Layout/Layout";
import UserView from "../../containers/UserView";
// import { getUser,  } from "../../server/db.txt";
import {getUserById} from "../../server/models/user";
import {getUserExperiences} from "../../server/models/experiences";
import dbConnect from "../../server/mongodbConnect";

const User = ({ user, userExperiences }) => {
  return (
    <Layout user={user}>
      <UserView user={user} userExperiences={userExperiences}/>
    </Layout>
  );
};
export async function getServerSideProps(context) {

  await dbConnect()

  // const user = await getUser(context.query.id);
  const user = await getUserById(context.query.id).then(data => {
    return JSON.parse(JSON.stringify(data))
  })

  const userExperiences = await getUserExperiences(context.query.id).then(data => {
    return JSON.parse(JSON.stringify(data))
  });

  return {
    props: {
      user: user[0] || null,
      userExperiences
    },
  };
}

export default User;
