import Layout from "../components/Layout/Layout";
import About from "../containers/About";
import { getSession } from "next-auth/client";

const about = () => {
  return (
    <Layout>
      <About />
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   return {
//     props: {
//       session,
//     },
//   };
// }

export default about;
