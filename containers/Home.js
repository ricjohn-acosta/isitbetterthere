import React from "react";
import MainSection from "../components/Content/Sections/MainSection";
import QuoteSection from "../components/Content/Sections/QuoteSection";
import StyledLowerNavbar from "../components/UI/Navigation/LowerNavbar";

const Home = () => {
  return (
    <>
    <StyledLowerNavbar />
      <MainSection />
      <QuoteSection/>
      {/**
       * <MainSection/>
       * <LearnSection/>
       * <TestimonialSection/>
       */}
    </>
  );
};

export default Home;
