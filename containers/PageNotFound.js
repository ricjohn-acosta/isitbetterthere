import React from "react";
import styled from "styled-components";
import LowerNavbar from "../components/Navigation/LowerNavbar";

const Wrapper = styled.div`
  min-height: 50vh;
`;

const PageNotFound = ({ session }) => {

  return (
    <>
      <LowerNavbar session={session} />
      <Wrapper>"Could not find page"</Wrapper>
    </>
  );
};

export default PageNotFound;
