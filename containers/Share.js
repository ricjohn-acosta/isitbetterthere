import LowerNavbar from "../components/Navigation/LowerNavbar";
import ShareStepperSection from "../components/Content/Sections/Share/ShareStepperSection";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Share = () => {
  const downMD = useMediaQuery("(max-width:959px)");

  return (
    <div>
      {downMD ? <LowerNavbar /> : null}
      <ShareStepperSection />
    </div>
  );
};

export default Share;
