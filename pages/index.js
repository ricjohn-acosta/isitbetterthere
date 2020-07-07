import Home from "../containers/Home";
import Layout from "../components/Layout/Layout";
import { getSession  } from 'next-auth/client'

const Index = ({session}) => {
  return (
    <Layout>
      {console.log(session)}
      <Home session={session}/>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  console.log("TEEEST", await getSession(context))
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default Index;
