import styled from "styled-components";
import request from "superagent";
import LowerNavbar from "../components/Navigation/LowerNavbar";
import Button from "@material-ui/core/Button";
import { Typography, TextField } from "@material-ui/core";

const Wrapper = styled.div`
  min-height: 75vh;
  padding: 0 5% 0 5%;
`;

const Content = styled.div`
  margin: 5% 32.5% 5% 32.5%;
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 5% 0;
  }
`;

const HeaderText = styled(Typography)``;
const DescriptionText = styled(Typography)``;
const FormContainer = styled.form``;
const Label = styled(Typography)`
  margin-top: 2.5vh;
  font-weight: bold;
`;
const EmailField = styled(TextField)``;
const MessageField = styled(TextField)`
  width: 60vh;
  ${(props) => props.theme.breakpoints.down("md")} {
    width: 100%;
  }
`;

const Contact = ({ session }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    return console.log("works");
  };
  return (
    <>
      <LowerNavbar session={session} />
      <Wrapper>
        <Content>
          <HeaderText variant="h2">Let us hear from you!</HeaderText>
          <br />
          <DescriptionText>
            &nbsp;Feel free to reach out to us. Suggestions, feedback, offer of
            help are all appreciated.
          </DescriptionText>
          <FormContainer onSubmit={handleSubmit}>
            <Label>Your email</Label>
            <EmailField type="email" variant="outlined" />
            <br />
            <Label>Your message</Label>
            <MessageField fullwidth variant="outlined" multiline rows={15} />
            <br />
            <br />
            <Button
              style={{color: "white"}}
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
              disableRipple
            >
              SUBMIT
            </Button>
          </FormContainer>
        </Content>
      </Wrapper>
    </>
  );
};

export default Contact;
