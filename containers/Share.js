import ShareStepperSection from "../components/Content/Sections/Share/ShareStepperSection";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LowerNavbar from "../components/Navigation/LowerNavbar";

const Share = ({session}) => {
  const downMD = useMediaQuery("(max-width:959px)");

  return (
    <div>
      

      <LowerNavbar session={session} />
      <ShareStepperSection />
    </div>
  );
};

export default Share;
