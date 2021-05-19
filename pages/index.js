import Home from "../containers/Home";
import Layout from "../components/Layout/Layout";
import { getSession } from "next-auth/client";
import { getTotalContributions } from "../server/db";
import { useRouter } from "next/router";
import {useSelector} from "react-redux";
import {getTotalNumberOfExperiences} from "../server/models/experiences";
import {useEffect} from "react";
import {updateTotalNumOfExperiences} from "../store/actions/experiences";
import {useDispatch} from 'react-redux'
import dbConnect from "../server/mongodbConnect";



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
  await dbConnect();

  const numberOfExperienceContributed = await getTotalNumberOfExperiences();

  return {
    props: {
      numberOfExperienceContributed,
    },
  };
}

export default Index;
