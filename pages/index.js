import Home from "../containers/Home";
import Layout from "../components/Layout/Layout";
import { session } from 'next-auth/client'

const Index = ({session}) => {
  return (
    <Layout>
      <Home session={session}/>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await session(context),
    },
  };
}

export default Index;
