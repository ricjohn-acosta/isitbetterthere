import MainSection from "../components/Content/Sections/Home/MainSection";
import QuoteSection from "../components/Content/Sections/Home/QuoteSection";
import TutorialSection from "../components/Content/Sections/Home/TutorialSection";
import LearnSection from "../components/Content/Sections/Home/LearnSection";
import LowerNavbar from "../components/Navigation/LowerNavbar";

const Home = ({session}) => {
  return (
    <>
      <LowerNavbar session={session} />
      <MainSection />
      <QuoteSection />
      <TutorialSection />
      <LearnSection />
    </>
  );
};

export default Home;
