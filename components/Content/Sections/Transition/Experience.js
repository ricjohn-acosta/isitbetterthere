import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const Wrapper = styled.div`
  min-height: 25vh;
  background-color: white;
`;

const ProfileContainer = styled(Grid)`
  margin-top: 5%;
`;

const ProfileDetails = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  margin-left: 2.5%;
  color: grey;
`;

const ChipsContainer = styled.div`
  padding-top: 5px;
`;
const Content = styled(Grid)`
  margin-top: 2.5vh;
`;
const Experience = () => {
  return (
    <Wrapper>
      <Grid container drection="column">
        <ProfileContainer item xs={6} sm={6} md={12}>
          <ProfileDetails>
            <Avatar style={{ marginTop: "5px" }} />
            <UserInfo>
              <div>John G. Doe</div>
              <div>john@gmail.com</div>
              <div>Senior nurse at Auckland Hospital</div>
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
        <Content item xs={6} sm={6} md={12}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum."
          <hr style={{ marginTop: "5vh" }} />
        </Content>
      </Grid>
    </Wrapper>
  );
};

export default Experience;
