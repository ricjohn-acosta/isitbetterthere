import LowerNavbar from "../components/Navigation/LowerNavbar";
import HeaderSection from "../components/Content/Sections/Transition/HeaderSection";
import OverviewSection from "../components/Content/Sections/Transition/OverviewSection";
import styled from "styled-components";

const Transition = ({ from, to }) => {
  return (
    <>
      <LowerNavbar />
      <HeaderSection from={from} to={to} />
      <OverviewSection/>
    </>
  );
};

export default Transition;
