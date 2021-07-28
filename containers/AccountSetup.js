import LowerNavbar from "../components/Navigation/LowerNavbar";
import NewAccountStepperSection from "../components/Content/Sections/NewAccount/NewAccountStepperSection";
import React from 'react';

const AccountSetup = ({session}) => {
  return (
    <>
      <LowerNavbar session={session}/>
      <NewAccountStepperSection session={session}/>
    </>
  );
};

export default AccountSetup;
