import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const Wrapper = styled.div`
  min-height: 25vh;
  background-color: white;
`;

const ProfileContainer = styled(Grid)`
  margin-top: 5vh;
`;

const ProfileDetails = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  margin-left: 2.5%;
  color: grey;
`;

const ChipsContainer = styled.div`
  padding-top: 10px;
`;
const Content = styled(Grid)`
  margin-top: 2.5vh;
`;

const ButtonGroup = styled.div`
  float: right;
`;
const Experience = ({ experience, name, company, position, email, bio }) => {
  return (
    <Wrapper>
      <Grid container drection="column">
        <ProfileContainer item xs={12} sm={6} md={12}>
          <ProfileDetails>
            <Avatar style={{ marginTop: "5px" }} />
            <UserInfo>
              <div style={{ display: "flex" }}>
                <PersonIcon style={{ color: "#1a8cff" }} fontSize="small" />
                &nbsp;{name}
              </div>
              <div style={{ display: "flex" }}>
                <EmailIcon style={{ color: "#1a8cff" }} fontSize="small" />
                &nbsp;{email}
              </div>
              <div style={{ display: "flex" }}>
                <WorkIcon style={{ color: "#1a8cff" }} fontSize="small" />
                &nbsp;{position} at {company}
              </div>
              <div style={{ display: "flex" }}>
                <ChatBubbleIcon style={{ color: "#1a8cff" }} fontSize="small" />
                &nbsp;{bio}
              </div>
            </UserInfo>
          </ProfileDetails>

          <ChipsContainer>
            <Chip label="Fulfilled" color="secondary" />
            &nbsp;
            <Chip label="Easily transitioned" color="primary" />
            &nbsp;
            <Chip label="Did not regret" color="default" />
            &nbsp;
          </ChipsContainer>
        </ProfileContainer>
        <Content item xs={12} sm={6} md={12}>
          {experience}
          <hr style={{ marginTop: "5vh" }} />
          <ButtonGroup>
            <Button>Relatable</Button>
            <Button>Not relatable</Button>
          </ButtonGroup>
        </Content>
      </Grid>
    </Wrapper>
  );
};

export default Experience;
