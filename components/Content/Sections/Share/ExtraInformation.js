import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Subheaders from "./common/Subheaders";
import PaperWrapper from "./common/PaperWrapper";
import HeaderDivider from "./common/HeaderDivider";
import {ButtonGroup, FormHelperText} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useEffect} from "react";
import {BackButton, NextButton} from "./ShareStepperNavigator";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";


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
                          }) => {

    const {watch, control, trigger, setError, setValue, register, formState: {errors}} = useForm({mode: "all"});
    const extraInformation = useSelector((state) => state.shareStory.extraInformation)
    const fieldStore = watch()

    useEffect(() => {
        if (Object.keys(fieldStore).length === 0) {
            setValue('fulfillment', null)
            setValue('difficulty', null)
            setValue('regret', null)
        }
    }, [fieldStore])

    useEffect(() => {
        if (!extraInformation) return
        if (extraInformation.fulfillment && extraInformation.difficulty && extraInformation.regret) {
            setValue('fulfillment', extraInformation.fulfillment)
            setValue('difficulty', extraInformation.difficulty)
            setValue('regret', extraInformation.regret)
        }
    }, [extraInformation])

    const handleFulfillment = (fullfilment) => {
        setFulfillment(fullfilment);
        setValue('fulfillment', fullfilment)
    };

    const handleEaseOfTransition = (difficulty) => {
        setEaseOfTransition(difficulty);
        setValue('difficulty', difficulty);
    };

    const handleRegret = (regret) => {
        setRegret(regret);
        setValue('regret', regret);
    };

    return (
        <Grid container direction={'row'}>
            <BackButton/>
            <Grid item xs={10} justify={'center'} alignItems={'center'}>
                <PaperWrapper>
                    <Subheaders icon={"/review.png"} variant="h4">
                        Extra information{" "}
                    </Subheaders>
                    <HeaderDivider/>

                    <StyledGrid container direction="column" spacing={3}>
                        <QuestionText variant="h4">
                            How fulfilling was the transition?{" "}
                        </QuestionText>
                        <Grid style={{width: '100%'}} item container direction="row">
                            <FormHelperText
                                error={!!errors}>{errors.fulfillment ? errors.fulfillment.message : null}</FormHelperText>
                            <ButtonGroup {...register('fulfillment')} fullWidth disableRipple a size="large"
                                         color="secondary"
                                         aria-label="large outlined primary button group">
                                <ToggleButtonStyle group={'fulfillment'} value={"Fulfilled"} state={fulfillment}
                                                   onClick={() => handleFulfillment("Fulfilled")}>Fulfilled</ToggleButtonStyle>
                                <ToggleButtonStyle group={'fulfillment'} value={"Mixed"} state={fulfillment}
                                                   onClick={() => handleFulfillment("Mixed")}>Mixed</ToggleButtonStyle>
                                <ToggleButtonStyle group={'fulfillment'} value={"Not fulfilled"} state={fulfillment}
                                                   onClick={() => handleFulfillment("Not fulfilled")}>Not
                                    fulfilled</ToggleButtonStyle>
                            </ButtonGroup>
                        </Grid>
                        <br/>
                        <QuestionText variant="h4">
                            How easy was the transition?{" "}
                        </QuestionText>

                        <Grid item container direction="row">
                            <FormHelperText
                                error={!!errors}>{errors.difficulty ? errors.difficulty.message : null}</FormHelperText>
                            <ButtonGroup {...register('difficulty')} fullWidth size="large" color="secondary"
                                         aria-label="large outlined primary button group">
                                <ToggleButtonStyle group={'difficulty'} value={"Easy"} state={easeOfTransition}
                                                   onClick={() => handleEaseOfTransition("Easy")}>Easy</ToggleButtonStyle>
                                <ToggleButtonStyle group={'difficulty'} value={"Medium"} state={easeOfTransition}
                                                   onClick={() => handleEaseOfTransition("Medium")}>Medium</ToggleButtonStyle>
                                <ToggleButtonStyle group={'difficulty'} value={"Hard"} state={easeOfTransition}
                                                   onClick={() => handleEaseOfTransition("Hard")}>Hard</ToggleButtonStyle>
                            </ButtonGroup>
                        </Grid>
                        <br/>
                        <QuestionText variant="h4">
                            Did you regret transitioning?{" "}
                        </QuestionText>
                        <Grid item container direction="row">
                            <FormHelperText
                                error={!!errors}>{errors.regret ? errors.regret.message : null}</FormHelperText>
                            <ButtonGroup {...register('regret')} fullWidth size="large" color="secondary"
                                         aria-label="large outlined primary button group">
                                <ToggleButtonStyle group={'regret'} value={"Did not regret"} state={regret}
                                                   onClick={() => handleRegret("Did not regret")}>Did not
                                    regret</ToggleButtonStyle>
                                <ToggleButtonStyle group={'regret'} value={"Did regret"} state={regret}
                                                   onClick={() => handleRegret("Did regret")}>Did
                                    regret</ToggleButtonStyle>
                            </ButtonGroup>
                        </Grid>
                    </StyledGrid>
                </PaperWrapper>
            </Grid>
            <NextButton fieldData={Object.keys(fieldStore).length === 0 ? extraInformation : fieldStore}
                        validator={trigger}
                        extraValidator={setError}
            />
        </Grid>
    );
};

export default ExtraInformation;
