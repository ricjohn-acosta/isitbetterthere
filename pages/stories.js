import Layout from "../components/Layout/Layout";
import Stories from "../containers/Stories";
import { getAllExperiences } from "../server/db";

const stories = ({allContributions}) => {
  return (
    <Layout>
      <Stories allContributions={allContributions}/>
    </Layout>
  );

};
export async function getServerSideProps(context) {
    const allContributions = await getAllExperiences();
  
    return {
      props: {
        allContributions,
      },
    };
  }

export default stories;
