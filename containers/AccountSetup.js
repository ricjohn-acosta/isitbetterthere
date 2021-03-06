import LowerNavbar from "../components/Navigation/LowerNavbar";
import NewAccountStepperSection from "../components/Content/Sections/NewAccount/NewAccountStepperSection";

const AccountSetup = ({session}) => {
  return (
    <>
      <LowerNavbar session={session}/>
      <NewAccountStepperSection session={session}/>
    </>
  );
};

export default AccountSetup;
