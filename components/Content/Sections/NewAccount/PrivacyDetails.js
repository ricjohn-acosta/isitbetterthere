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
  setHideOccupation,
  setHideCompany,
  setHideLocation,
  emptyFields
}) => {
  const [isChecked, setChecked] = React.useState(false);

  const handleChange = (target) => {
    switch (target) {
      case "name":
        setChecked(!isChecked);
        setHideName(!isChecked);
        break;

      case "occupation":
        setChecked(!isChecked);
        setHideOccupation(!isChecked);
        break;

      case "company":
        setChecked(!isChecked);
        setHideCompany(!isChecked);
        break;

      case "location":
        setChecked(!isChecked);
        setHideLocation(!isChecked);
        break;

      default:
        break;
    }
  };

  return (
    <Wrapper>
      {console.log(emptyFields)}
      <Typography variant="h5">
        Hide your information when you share your experience in the experience
        section
      </Typography>

      <FormContainer container direction="column" spacing={4}>
        <Grid item container direction="row">
          <Labels item xs={12} sm={12} md={3}>
            Hide name? &nbsp;
          </Labels>
          <Grid item xs={12} sm={12} md={2}>
            <Checkbox onChange={(e) => handleChange("name")} color="default" />
          </Grid>
        </Grid>

        <Grid item container direction="row">
          <Labels item xs={12} sm={12} md={3}>
            Hide Occupation? &nbsp;
          </Labels>
          <Grid item xs={12} sm={12} md={2}>
            <Checkbox
              onChange={(e) => handleChange("occupation")}
              color="default"
            />
          </Grid>
        </Grid>

        <Grid item container direction="row">
          <Labels item xs={12} sm={12} md={3}>
            Hide company? &nbsp;
          </Labels>
          <Grid item xs={12} sm={12} md={2}>
            <Checkbox
              onChange={(e) => handleChange("company")}
              color="default"
            />
          </Grid>
        </Grid>

        <Grid item container direction="row">
          <Labels item xs={12} sm={12} md={3}>
            Hide location? &nbsp;
          </Labels>
          <Grid item xs={12} sm={12} md={2}>
            <Checkbox
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
