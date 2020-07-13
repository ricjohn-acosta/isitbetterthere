import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

const Wrapper = styled.div`
  min-height: 50vh;
  margin: 5vh 0 2.5vh 2.5vw;
`;

const FormContainer = styled(Grid)`
  margin-top: 5vh;
`;

const Labels = styled(Grid)`
  display: flex;
  align-items: center;
  padding-left: 5vw;
  font-weight: bold;
`;

const PrivacyDetails = ({
  setHideName,
  setHideEmail,
  setHideOccupation,
  setHideCompany,
  setHideLocation,
  hideName,
  hideEmail,
  hideOccupation,
  hideCompany,
  hideLocation,
}) => {
  const handleChange = (target) => {
    switch (target) {
      case "name":
        // setChecked(!isChecked);
        setHideName(!hideName);
        break;

      case "email":
        // setChecked(!isChecked);
        setHideEmail(!hideEmail);
        break;

      case "occupation":
        // setChecked(!isChecked);
        setHideOccupation(!hideOccupation);
        break;

      case "company":
        // setChecked(!isChecked);
        setHideCompany(!hideCompany);
        break;

      case "location":
        // setChecked(!isChecked);
        setHideLocation(!hideLocation);
        break;

      default:
        break;
    }
  };

  return (
    <Wrapper>
      <Typography variant="h5">
        Hide your information when you share your experience in the experience
        section
      </Typography>

      <FormContainer container direction="column" spacing={4}>
        <Grid item container direction="row">
          <Labels item xs={6} sm={6} md={3}>
            Hide name? &nbsp;
          </Labels>
          <Grid item xs={6} sm={6} md={2}>
            <Checkbox
              checked={hideName}
              onChange={(e) => handleChange("name")}
              color="default"
            />
          </Grid>
        </Grid>

        <Grid item container direction="row">
          <Labels item xs={6} sm={6} md={3}>
            Hide email? &nbsp;
          </Labels>
          <Grid item xs={6} sm={6} md={2}>
            <Checkbox
              checked={hideEmail}
              onChange={(e) => handleChange("email")}
              color="default"
            />
          </Grid>
        </Grid>

        <Grid item container direction="row">
          <Labels item xs={6} sm={6} md={3}>
            Hide occupation? &nbsp;
          </Labels>
          <Grid item xs={6} sm={6} md={2}>
            <Checkbox
              checked={hideOccupation}
              onChange={(e) => handleChange("occupation")}
              color="default"
            />
          </Grid>
        </Grid>

        <Grid item container direction="row">
          <Labels item xs={6} sm={6} md={3}>
            Hide company? &nbsp;
          </Labels>
          <Grid item xs={6} sm={6} md={2}>
            <Checkbox
              checked={hideCompany}
              onChange={(e) => handleChange("company")}
              color="default"
            />
          </Grid>
        </Grid>

        <Grid item container direction="row">
          <Labels item xs={6} sm={6} md={3}>
            Hide location? &nbsp;
          </Labels>
          <Grid item xs={6} sm={6} md={2}>
            <Checkbox
              checked={hideLocation}
              onChange={(e) => handleChange("location")}
              color="default"
            />
          </Grid>
        </Grid>
      </FormContainer>
    </Wrapper>
  );
};

export default PrivacyDetails;
