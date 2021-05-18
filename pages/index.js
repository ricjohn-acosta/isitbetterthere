import Home from "../containers/Home";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/client";
import { getAllUserExperiences } from "../server/db";
import { useRouter } from "next/router";
import {useSelector} from "react-redux";
import {getTotalNumberOfExperiences} from "../server/models/experiences";
import {useEffect} from "react";
import {updateTotalNumOfExperiences} from "../store/actions/experiences";
import {useDispatch} from 'react-redux'


const Index = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('index', props.numberOfExperienceContributed)
      dispatch(updateTotalNumOfExperiences(props.numberOfExperienceContributed))
  }, [dispatch])

  return (
    <Layout>
      <Home/>
    </Layout>
  );
};

export async function getServerSideProps(context) {

  const numberOfExperienceContributed = await getTotalNumberOfExperiences();

  console.log(numberOfExperienceContributed)

  return {
    props: {
      numberOfExperienceContributed,
    },
  };
}

export default Index;
