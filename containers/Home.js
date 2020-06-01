import React from "react";
import MainSection from "../components/Content/Sections/MainSection";
import QuoteSection from "../components/Content/Sections/QuoteSection";
import TutorialSection from "../components/Content/Sections/TutorialSection";
import LearnSection from "../components/Content/Sections/LearnSection";
import LowerNavbar from "../components/Navigation/LowerNavbar";

const Home = () => {
  return (
    <>
      <LowerNavbar />
      <MainSection />
      <QuoteSection />
      <TutorialSection />
      <LearnSection/>
    </>
  );
};

export default Home;
