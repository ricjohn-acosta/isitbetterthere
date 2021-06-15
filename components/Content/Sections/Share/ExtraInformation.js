import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Subheaders from "./common/Subheaders";
import PaperWrapper from "./common/PaperWrapper";
import HeaderDivider from "./common/HeaderDivider";
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";


const StyledGrid = styled(Grid)`
  padding: 2.5% 0 0 0;
  margin-top: 2.5vh;
`;

const ToggleButtonStyle = styled(Button)`
  &:hover {
    background-color: #8cc2bd;
  }
  background-color: ${(props) => {
    if (props.group === 'fulfillment') {
      if (props.state === 'Fulfilled' && props.value === 'Fulfilled') {
        return "#8cc2bd"
      }

      if (props.state === 'Mixed' && props.value === 'Mixed') {
        return "#8cc2bd"
      }

      if (props.state === 'Not fulfilled' && props.value === 'Not fulfilled') {
        return "#8cc2bd"
      }
    }

    if (props.group === 'difficulty') {
      if (props.state === 'Easy' && props.value === 'Easy') {
        return "#8cc2bd"
      }

      if (props.state === 'Medium' && props.value === 'Medium') {
        return "#8cc2bd"
      }

      if (props.state === 'Hard' && props.value === 'Hard') {
        return "#8cc2bd"
      }
    }

    if (props.group === 'regret') {
      if (props.state === 'Did not regret' && props.value === 'Did not regret') {
        return "#8cc2bd"
      }

      if (props.state === 'Did regret' && props.value === 'Did regret') {
        return "#8cc2bd"
      }
    }
  }
}
`;

const QuestionText = styled(Typography)`
  ${(props) => props.theme.breakpoints.down(441)} {
    font-size: 1.5em;
  }
`;

const ExtraInformation = ({
                              setFulfillment,
                              fulfillment,
                              setEaseOfTransition,
                              easeOfTransition,
                              setRegret,
                              regret,
                              extraInfoEmptyState,
                          }) => {
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
        <PaperWrapper>
            <Subheaders icon={"/review.png"} variant="h4">
                Extra information{" "}
            </Subheaders>
            <HeaderDivider/>

            <StyledGrid container direction="column" spacing={3}>
                <QuestionText variant="h4">
                    How fulfilling was the transition?{" "}
                    {extraInfoEmptyState ? (
                        <Typography
                            style={{color: "red"}}
                            component="span"
                            variant="subtitle2"
                        >
                            (required)
                        </Typography>
                    ) : null}
                </QuestionText>
                <Grid style={{width: '100%'}} item container direction="row">
                    <ButtonGroup fullWidth disableRipple a size="large" color="secondary"
                                 aria-label="large outlined primary button group">
                        <ToggleButtonStyle group={'fulfillment'} value={"Fulfilled"} state={fulfillment}
                                           onClick={() => handleFulfillment("Fulfilled")}>Fulfilled</ToggleButtonStyle>
                        <ToggleButtonStyle group={'fulfillment'} value={"Mixed"} state={fulfillment}
                                           onClick={() => handleFulfillment("Mixed")}>Mixed</ToggleButtonStyle>
                        <ToggleButtonStyle group={'fulfillment'} value={"Not fulfilled"} state={fulfillment}
                                           onClick={() => handleFulfillment("Not fulfilled")}>Not
                            fulfilled</ToggleButtonStyle>
                    </ButtonGroup>
                    {/*<Grid align="center" xs={4} sm={4} item>*/}
                    {/*  <FormControlLabel*/}
                    {/*    control={*/}
                    {/*      <Radio*/}
                    {/*        color="primary"*/}
                    {/*        onChange={() => handleFulfillment("Fulfilled")}*/}
                    {/*        checked={fulfillment === "Fulfilled"}*/}
                    {/*      />*/}
                    {/*    }*/}
                    {/*    label="Fulfilled"*/}
                    {/*    labelPlacement="bottom"*/}
                    {/*  />*/}
                    {/*</Grid>*/}
                    {/*<Grid align="center" xs={4} sm={4} item>*/}
                    {/*  <FormControlLabel*/}
                    {/*    control={*/}
                    {/*      <Radio*/}
                    {/*        color="primary"*/}
                    {/*        onChange={() => handleFulfillment("Mixed")}*/}
                    {/*        checked={fulfillment === "Mixed"}*/}
                    {/*      />*/}
                    {/*    }*/}
                    {/*    label="Mixed"*/}
                    {/*    labelPlacement="bottom"*/}
                    {/*  />*/}
                    {/*</Grid>*/}
                    {/*<Grid align="center" xs={4} sm={4} item>*/}
                    {/*  <FormControlLabel*/}
                    {/*    control={*/}
                    {/*      <Radio*/}
                    {/*        color="primary"*/}
                    {/*        onChange={() => handleFulfillment("Not fulfilled")}*/}
                    {/*        checked={fulfillment === "Not fulfilled"}*/}
                    {/*      />*/}
                    {/*    }*/}
                    {/*    label="Not fulfilled"*/}
                    {/*    labelPlacement="bottom"*/}
                    {/*  />*/}
                    {/*</Grid>*/}
                </Grid>
                <br/>
                <QuestionText variant="h4">
                    How easy was the transition?{" "}
                    {extraInfoEmptyState ? (
                        <Typography
                            style={{color: "red"}}
                            component="span"
                            variant="subtitle2"
                        >
                            (required)
                        </Typography>
                    ) : null}
                </QuestionText>

                <Grid item container direction="row">
                    <ButtonGroup fullWidth size="large" color="secondary"
                                 aria-label="large outlined primary button group">
                        <ToggleButtonStyle group={'difficulty'} value={"Easy"} state={easeOfTransition}
                                           onClick={() => handleEaseOfTransition("Easy")}>Easy</ToggleButtonStyle>
                        <ToggleButtonStyle group={'difficulty'} value={"Medium"} state={easeOfTransition}
                                           onClick={() => handleEaseOfTransition("Medium")}>Medium</ToggleButtonStyle>
                        <ToggleButtonStyle group={'difficulty'} value={"Hard"} state={easeOfTransition}
                                           onClick={() => handleEaseOfTransition("Hard")}>Hard</ToggleButtonStyle>
                    </ButtonGroup>
                    {/*<Grid align="center" xs={4} sm={4} item>*/}
                    {/*  <FormControlLabel*/}
                    {/*    value="bottom"*/}
                    {/*    control={*/}
                    {/*      <Radio*/}
                    {/*        color="primary"*/}
                    {/*        onChange={() => handleEaseOfTransition("Easy")}*/}
                    {/*        checked={easeOfTransition === "Easy"}*/}
                    {/*      />*/}
                    {/*    }*/}
                    {/*    label="Easy"*/}
                    {/*    labelPlacement="bottom"*/}
                    {/*  />*/}
                    {/*</Grid>*/}
                    {/*<Grid align="center" xs={4} sm={4} item>*/}
                    {/*  <FormControlLabel*/}
                    {/*    value="bottom"*/}
                    {/*    control={*/}
                    {/*      <Radio*/}
                    {/*        color="primary"*/}
                    {/*        onChange={() => handleEaseOfTransition("Medium")}*/}
                    {/*        checked={easeOfTransition === "Medium"}*/}
                    {/*      />*/}
                    {/*    }*/}
                    {/*    label="Medium"*/}
                    {/*    labelPlacement="bottom"*/}
                    {/*  />*/}
                    {/*</Grid>*/}
                    {/*<Grid align="center" xs={4} sm={4} item>*/}
                    {/*  <FormControlLabel*/}
                    {/*    value="bottom"*/}
                    {/*    control={*/}
                    {/*      <Radio*/}
                    {/*        color="primary"*/}
                    {/*        onChange={() => handleEaseOfTransition("Hard")}*/}
                    {/*        checked={easeOfTransition === "Hard"}*/}
                    {/*      />*/}
                    {/*    }*/}
                    {/*    label="Hard"*/}
                    {/*    labelPlacement="bottom"*/}
                    {/*  />*/}
                    {/*</Grid>*/}
                </Grid>
                <br/>
                <QuestionText variant="h4">
                    Did you regret transitioning?{" "}
                    {extraInfoEmptyState ? (
                        <Typography
                            style={{color: "red"}}
                            component="span"
                            variant="subtitle2"
                        >
                            (required)
                        </Typography>
                    ) : null}
                </QuestionText>
                <Grid item container direction="row">
                    <ButtonGroup fullWidth size="large" color="secondary"
                                 aria-label="large outlined primary button group">
                        <ToggleButtonStyle group={'regret'} value={"Did not regret"} state={regret}
                                           onClick={() => handleRegret("Did not regret")}>Did not
                            regret</ToggleButtonStyle>
                        <ToggleButtonStyle group={'regret'} value={"Did regret"} state={regret}
                                           onClick={() => handleRegret("Did regret")}>Did
                            regret</ToggleButtonStyle>
                    </ButtonGroup>
                    {/*<Grid align="center" xs={4} sm={4} item>*/}
                    {/*  <FormControlLabel*/}
                    {/*    value="bottom"*/}
                    {/*    control={*/}
                    {/*      <Radio*/}
                    {/*        color="primary"*/}
                    {/*        onChange={() => handleRegret("Did not regret")}*/}
                    {/*        checked={regret === "Did not regret"}*/}
                    {/*      />*/}
                    {/*    }*/}
                    {/*    label="Did not regret"*/}
                    {/*    labelPlacement="bottom"*/}
                    {/*  />*/}
                    {/*</Grid>*/}
                    {/*<Grid align="center" xs={4} sm={4} item>*/}
                    {/*  <FormControlLabel*/}
                    {/*    value="bottom"*/}
                    {/*    control={*/}
                    {/*      <Radio*/}
                    {/*        color="primary"*/}
                    {/*        onChange={() => handleRegret("Did regret")}*/}
                    {/*        checked={regret === "Did regret"}*/}
                    {/*      />*/}
                    {/*    }*/}
                    {/*    label="Did regret"*/}
                    {/*    labelPlacement="bottom"*/}
                    {/*  />*/}
                    {/*</Grid>*/}
                </Grid>
            </StyledGrid>
        </PaperWrapper>
    );
};

export default ExtraInformation;
