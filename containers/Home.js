import React from "react";
import MainSection from "../components/Content/Sections/MainSection";
import QuoteSection from "../components/Content/Sections/QuoteSection";
import TutorialSection from "../components/Content/Sections/TutorialSection";
import LearnSection from "../components/Content/Sections/LearnSection";
import LowerNavbar from "../components/Navigation/LowerNavbar";

const Home = ({session}) => {
  return (
    <>
      <LowerNavbar session={session}/>
      <MainSection />
      <QuoteSection />
      <TutorialSection />
      <LearnSection />
    </>
  );
};

export default Home;
