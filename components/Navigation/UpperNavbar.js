import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import BrandLogo from "./BrandLogo";
import { useRouter } from "next/router";
import Link from "next/link";

const UpperNavbar = styled(AppBar)`
  background-color: #33cccc;
  display: flex;
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  color: #404040;
  position: relative;
  float: right;
  padding: 8.5px;
  text-align: center;
`;

const Container = styled.div`
  position: relative;
  margin-right: 15vw;
  margin-left: 15vw;
  ${(props) => props.theme.breakpoints.down("md")} {
    margin-left: 0;
    margin-right: 0;
  }
`;

const StyledUpperNavbar = () => {
  const router = useRouter();
  return (
    <UpperNavbar elevation={0} position="static">
      <Container>
        {/* <Link href="/our-team" passHref>
          <StyledButton disableRipple>Meet the team</StyledButton>
        </Link> */}
        <Link href="/contact" passHref>
        <StyledButton disableRipple>
          Contact
        </StyledButton>
        </Link>
        <Link href="/about" passHref>
        <StyledButton href="/about" disableRipple>
          About
        </StyledButton>
        </Link>
      </Container>
    </UpperNavbar>
  );
};

export default StyledUpperNavbar;
