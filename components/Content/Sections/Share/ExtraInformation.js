import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Subheaders from "./common/Subheaders";

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const Wrapper = styled.div`
  // margin: 2.5% 15% 0 15%;
`;

const StyledGrid = styled(Grid)`
  padding: 2.5% 15% 0% 15%;
  margin-top: 2.5vh;
`;

const Preview = styled.div`
  margin: 2.5vh 5vw 2.5vh 5vw;
  overflow: auto;
`;

const StyledPaper = styled(Paper)`
  margin: 2.5% 10% 0% 10%;
  padding: 2.5vh 0 2.5vh 0;
`;

const ExtraInformation = ({
  setFulfillment,
  fulfillment,
  setEaseOfTransition,
  easeOfTransition,
  setRegret,
  regret,
  editorState,
}) => {
  const htmlInput = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const preview = htmlToReactParser.parse(htmlInput);

  const handleFulfillment = (fullfilment) => {
    setFulfillment(fullfilment);
  };

  const handleEaseOfTransition = (difficulty) => {
    setEaseOfTransition(difficulty);
  };

  const handleRegret = (regret) => {
    setRegret(regret);
  };

  return (
    <>
      <Subheaders icon={"/review.png"} variant="h4">
        Extra information{" "}
      </Subheaders>
      <hr/>
      <Wrapper>
        <StyledGrid container direction="column" spacing={3}>
          <Typography variant="h4">
            How fulfilling was the transition?
          </Typography>
          <Grid item container direction="row">
            <Grid align="center" xs={4} sm={4} item>
              <FormControlLabel
                control={
                  <Radio
                    color="primary"
                    onChange={() => handleFulfillment("Fulfilled")}
                    checked={fulfillment === "Fulfilled"}
                  />
                }
                label="Fulfilled"
                labelPlacement="bottom"
              />
            </Grid>
            <Grid align="center" xs={4} sm={4} item>
              <FormControlLabel
                control={
                  <Radio
                    color="primary"
                    onChange={() => handleFulfillment("Mixed")}
                    checked={fulfillment === "Mixed"}
                  />
                }
                label="Mixed"
                labelPlacement="bottom"
              />
            </Grid>
            <Grid align="center" xs={4} sm={4} item>
              <FormControlLabel
                control={
                  <Radio
                    color="primary"
                    onChange={() => handleFulfillment("Not fulfilled")}
                    checked={fulfillment === "Not fulfilled"}
                  />
                }
                label="Not fulfilled"
                labelPlacement="bottom"
              />
            </Grid>
          </Grid>
          <br />
          <Typography variant="h4">How easy was the transition?</Typography>
          <Grid item container direction="row">
            <Grid align="center" xs={4} sm={4} item>
              <FormControlLabel
                value="bottom"
                control={
                  <Radio
                    color="primary"
                    onChange={() => handleEaseOfTransition("Easy")}
                    checked={easeOfTransition === "Easy"}
                  />
                }
                label="Easy"
                labelPlacement="bottom"
              />
            </Grid>
            <Grid align="center" xs={4} sm={4} item>
              <FormControlLabel
                value="bottom"
                control={
                  <Radio
                    color="primary"
                    onChange={() => handleEaseOfTransition("Medium")}
                    checked={easeOfTransition === "Medium"}
                  />
                }
                label="Medium"
                labelPlacement="bottom"
              />
            </Grid>
            <Grid align="center" xs={4} sm={4} item>
              <FormControlLabel
                value="bottom"
                control={
                  <Radio
                    color="primary"
                    onChange={() => handleEaseOfTransition("Hard")}
                    checked={easeOfTransition === "Hard"}
                  />
                }
                label="Hard"
                labelPlacement="bottom"
              />
            </Grid>
          </Grid>
          <br />
          <Typography variant="h4">Did you regret transitioning?</Typography>
          <Grid item container direction="row">
            <Grid align="center" xs={4} sm={4} item>
              <FormControlLabel
                value="bottom"
                control={
                  <Radio
                    color="primary"
                    onChange={() => handleRegret("Did not regret")}
                    checked={regret === "Did not regret"}
                  />
                }
                label="Did not regret"
                labelPlacement="bottom"
              />
            </Grid>
            <Grid align="center" xs={4} sm={4} item>
              <FormControlLabel
                value="bottom"
                control={
                  <Radio
                    color="primary"
                    onChange={() => handleRegret("Did regret")}
                    checked={regret === "Did regret"}
                  />
                }
                label="Did regret"
                labelPlacement="bottom"
              />
            </Grid>
          </Grid>
        </StyledGrid>

        <Subheaders variant="h4">Preview: </Subheaders>
        <StyledPaper>
          <Preview>{preview}</Preview>
        </StyledPaper>
      </Wrapper>
    </>
  );
};

export default ExtraInformation;
