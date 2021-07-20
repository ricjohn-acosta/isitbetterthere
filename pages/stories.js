import Layout from "../components/Layout/Layout";
import Stories from "../containers/Stories";
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

    const allContributions = await getAllUsersExperiences().then(data => {
        return JSON.parse(JSON.stringify(data))
    });

    return {
      props: {
        allContributions,
      },
    };
  }

export default stories;
