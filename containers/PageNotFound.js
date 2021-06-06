import React from "react";
import styled from "styled-components";
import LowerNavbar from "../components/Navigation/LowerNavbar";
import {useSession} from "next-auth/client";

const Wrapper = styled.div`
  min-height: 50vh;
`;

const PageNotFound = () => {

    const [session, loading] = useSession();

    return (
    <>
      <LowerNavbar session={session} />
      <Wrapper>"Could not find page"</Wrapper>
    </>
  );
};

export default PageNotFound;
