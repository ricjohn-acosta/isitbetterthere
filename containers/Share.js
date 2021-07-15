import React from "react";
import ShareStepperSection from "../components/Content/Sections/Share/ShareStepperSection";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LowerNavbar from "../components/Navigation/LowerNavbar";

const Share = ({session, userExperiences}) => {
  const downMD = useMediaQuery("(max-width:959px)");

  return (
    <div>
      <LowerNavbar/>
      <ShareStepperSection/>
    </div>
  );
};

export default Share;
