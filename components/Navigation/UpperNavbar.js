import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

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
  margin-right: 13vw;
  margin-left: 13vw;
  ${(props) => props.theme.breakpoints.down("md")} {
    margin-left: 0;
    margin-right: 0;
  }
`;

const StyledUpperNavbar = () => {
  return (
    <UpperNavbar elevation={0} position="static">
      <Container>
        <StyledButton disableRipple>Meet the team</StyledButton>
        <StyledButton disableRipple>Contact</StyledButton>
        <StyledButton disableRipple>About</StyledButton>
      </Container>
    </UpperNavbar>
  );
};

export default StyledUpperNavbar;
