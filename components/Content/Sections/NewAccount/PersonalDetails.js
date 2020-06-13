import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

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

const PersonalDetails = ({
  setDescription,
  setOccupationState,
  setCompany,
  setPosition,
  setLocation,
  description,
  occupationState,
  company,
  position,
  location,
  emptyFields,
}) => {
  const [occupation, setOccupation] = React.useState("");

  const handleValues = (value) => {
    if (value !== "Unemployed") {
      setOccupation(value);
      setOccupationState(value);
    } else {
      setOccupation(value);
      setPosition("")
      setCompany("")
      setOccupationState(value);
    }
  };

  return (
    <Wrapper>
      {console.log(emptyFields)}
      <Typography variant="h5">
        This information will be shown in your profile dashboard and in your
        contributed experiences
      </Typography>

      <FormContainer container direction="column" spacing={4}>
        <Grid item container direction="row">
          <Labels item xs={12} sm={12} md={3}>
            Short description about you: &nbsp;
          </Labels>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              error={
                emptyFields
                  ? emptyFields.find((e) => e === "description") !== undefined
                    ? true
                    : false
                  : false
              }
            />
          </Grid>
        </Grid>

        <Grid item container direction="row">
          <Labels item xs={12} sm={12} md={3}>
            Occupation: &nbsp;
          </Labels>
          <Grid item xs={12} sm={12} md={2}>
            <Select
              fullWidth
              variant="outlined"
              onChange={(e) => {
                e.target.value === "Unemployed"
                  ? handleValues(e.target.value)
                  : handleValues(e.target.value);
              }}
              value={occupationState}
              error={
                emptyFields
                  ? emptyFields.find((e) => e === "occupation") !== undefined
                    ? true
                    : false
                  : false
              }
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Employed">Employed</MenuItem>
              <MenuItem value="Unemployed">Unemployed</MenuItem>
            </Select>
          </Grid>
        </Grid>

        {occupationState === "Unemployed" ? null : (
          <Grid item container direction="row">
            <Labels item xs={12} sm={12} md={3}>
              Company:* &nbsp;
            </Labels>
            <Grid item xs={12} sm={12} md={2}>
              <TextField
                value={company}
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                error={
                  emptyFields
                    ? emptyFields.find((e) => e === "company") !== undefined
                      ? true
                      : false
                    : false
                }
              />
            </Grid>
          </Grid>
        )}

        {occupationState === "Unemployed" ? null : (
          <Grid item container direction="row">
            <Labels item xs={12} sm={12} md={3}>
              Position: &nbsp;
            </Labels>
            <Grid item xs={12} sm={12} md={2}>
              <TextField
                value={position}
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
                error={
                  emptyFields
                    ? emptyFields.find((e) => e === "position") !== undefined
                      ? true
                      : false
                    : false
                }
              />
            </Grid>
          </Grid>
        )}

        <Grid item container direction="row">
          <Labels item xs={12} sm={12} md={3}>
            Country: &nbsp;
          </Labels>
          <Grid item xs={12} sm={12} md={2}>
            <TextField
              value={location}
              fullWidth
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              variant="outlined"
              error={
                emptyFields
                  ? emptyFields.find((e) => e === "location") !== undefined
                    ? true
                    : false
                  : false
              }
            />
          </Grid>
        </Grid>
      </FormContainer>
    </Wrapper>
  );
};

export default PersonalDetails;
