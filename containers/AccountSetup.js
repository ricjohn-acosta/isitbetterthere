import LowerNavbar from "../components/Navigation/LowerNavbar";
import StepperSection from "../components/Content/Sections/NewAccount/StepperSection";

const AccountSetup = ({session}) => {
  return (
    <>
      <LowerNavbar session={session}/>
      <StepperSection session={session}/>
    </>
  );
};

export default AccountSetup;
