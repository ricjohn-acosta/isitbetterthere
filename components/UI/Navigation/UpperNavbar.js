import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const UpperNavbar = styled(AppBar)`
  background-color: #d0d0d0;
  display: flex;
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  color: #404040;
  position: relative;
  float: right;
  padding-left: 1.5vw;
`;

const Container = styled.div`
  position: relative;
  margin-right: 15vw;
  margin-left: 13vw;
`;

const StyledUpperNavbar = () => {
  return (
    <UpperNavbar elevation={0} position="static">
      <Container>
        <StyledButton disableRipple>About</StyledButton>
        <StyledButton disableRipple>Contact</StyledButton>
      </Container>
    </UpperNavbar>
  );
};

export default StyledUpperNavbar;
