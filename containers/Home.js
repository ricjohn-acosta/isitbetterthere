import React from "react";
import MainSection from "../components/Content/Sections/MainSection";
import QuoteSection from "../components/Content/Sections/QuoteSection";
import TutorialSection from "../components/Content/Sections/TutorialSection";
import StyledLowerNavbar from "../components/UI/Navigation/LowerNavbar";

const Home = () => {
  return (
    <>
      <StyledLowerNavbar />
      <MainSection />
      <QuoteSection />
      <TutorialSection />
    </>
  );
};

export default Home;
