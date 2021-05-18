import Home from "../containers/Home";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/client";
import { getTotalContributions } from "../server/db";
import { useRouter } from "next/router";
import {useSelector} from "react-redux";


const Index = (props) => {
  const localUser = useSelector((state) => state.users.user)

  console.log('localUser', localUser);
  return (
    <Layout>
      <Home/>
    </Layout>
  );
};

export async function getServerSideProps(context) {

  const allUserExperience = await getTotalContributions();
  let contributionCount = allUserExperience.length;

  const numberOfExperienceContributed = await getTotalNumberOfExperiences();

  console.log(numberOfExperienceContributed)

  return {
    props: {
      numberOfExperienceContributed,
    },
  };
}

export default Index;
