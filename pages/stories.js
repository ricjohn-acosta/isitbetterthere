import Layout from "../components/Layout/Layout";
import Stories from "../containers/Stories";
import { getAllExperiences } from "../server/db";
import dbConnect from "../server/mongodbConnect";
import {getAllUsersExperiences} from "../server/models/experiences";

const stories = ({allContributions}) => {
  return (
    <Layout>
      <Stories allContributions={allContributions}/>
    </Layout>
  );

};
export async function getServerSideProps(context) {
    await dbConnect();

    const allContributions = await getAllExperiences();
    const test = await getAllUsersExperiences()
    console.log('all user experiences', test[0].user);
  
    return {
      props: {
        allContributions,
      },
    };
  }

export default stories;
