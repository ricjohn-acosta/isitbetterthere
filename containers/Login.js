import styled from "styled-components";
import LowerNavbar from "../components/Navigation/LowerNavbar";

const Wrapper = styled.div`
  height: 70vh;
`;

const Login = () => {
  return (
    <Wrapper>
      <LowerNavbar />
      Login page
    </Wrapper>
  );
};

export default Login;
