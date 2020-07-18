import LowerNavbar from "../components/Navigation/LowerNavbar";
import AccountSection from "../components/Content/Sections/Account/AccountSection";

const AccountSetup = (props) => {
  return (
    <>
      <LowerNavbar {...props} />
      <AccountSection {...props} />
    </>
  );
};

export default AccountSetup;
