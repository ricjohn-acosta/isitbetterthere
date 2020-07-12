import MainSection from "../components/Content/Sections/Home/MainSection";
import QuoteSection from "../components/Content/Sections/Home/QuoteSection";
import TutorialSection from "../components/Content/Sections/Home/TutorialSection";
import LearnSection from "../components/Content/Sections/Home/LearnSection";
import ContributionCountSection from "../components/Content/Sections/Home/ContributionCountSection";
import LowerNavbar from "../components/Navigation/LowerNavbar";

const Home = ({ session, contributionCount }) => {
  return (
    <>
      <LowerNavbar session={session} />
      <MainSection />
      <QuoteSection />
      <ContributionCountSection contributionCount={contributionCount} />
      <TutorialSection />
      <LearnSection />
    </>
  );
};

export default Home;
