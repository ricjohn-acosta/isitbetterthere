import { useRouter } from "next/router";
import Transition from "../containers/Transition";
import Layout from "../components/Layout/Layout";
import LowerNavbar from "../components/Navigation/LowerNavbar";
import PageNotFound from "../containers/PageNotFound"

const transition = () => {
  const router = useRouter();
  const { from, to, category } = router.query;

  if (Object.keys(router.query).length === 0) {
    return (
      <Layout>
        <PageNotFound/>
      </Layout>
    );
  } else {
    return (
      <>
        <Layout>
          <Transition from={from} to={to} category={category} />
        </Layout>
      </>
    );
  }
};

export default transition;
