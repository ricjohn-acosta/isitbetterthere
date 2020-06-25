import LowerNavbar from "../components/Navigation/LowerNavbar";
import HeaderSection from "../components/Content/Sections/Transition/HeaderSection";
import OverviewSection from "../components/Content/Sections/Transition/OverviewSection";
import ExperienceSection from "../components/Content/Sections/Transition/ExperienceSection";

const Transition = ({ from, to, category, session, experiences}) => {
  return (
    <>
      <LowerNavbar session={session}/>
      <HeaderSection from={from} to={to} category={category} experiences={experiences}/>
      <OverviewSection from={from} to={to} experiences={experiences}/>
      <ExperienceSection experiences={experiences}/>
    </>
  );
};

export default Transition;
