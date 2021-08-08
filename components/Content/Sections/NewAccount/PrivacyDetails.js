import styled from "styled-components";
import {Typography, Grid, Checkbox, CircularProgress} from "@material-ui/core";
import NewAccountStepNavigator from "./NewAccountStepNavigator";
import {Controller, useForm} from "react-hook-form";
import React from "react";
import {useSelector} from "react-redux";

const Wrapper = styled.form`
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
                            formObserver,
                            formControl,
                            source
                        }) => {
    const privacyDetails = useSelector((state) => state.newAccountSetup.privacyDetailsData)
    const userData = useSelector((state) => state.users.user)

    if (!userData) {
        return <CircularProgress/>
    }
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
                        <Controller
                            name="hideName"
                            control={formControl}
                            defaultValue={(userData && userData.hide_name) || (privacyDetails && privacyDetails.hideName) || false}

                            render={({field: {onChange, value}}) => (
                                <>
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                        color="default"
                                    />
                                </>
                            )}
                        />

                    </Grid>
                </Grid>

                <Grid item container direction="row">
                    <Labels item xs={6} sm={6} md={3}>
                        Hide email? &nbsp;
                    </Labels>
                    <Grid item xs={6} sm={6} md={2}>
                        <Controller
                            name="hideEmail"
                            control={formControl}
                            defaultValue={(userData && userData.hide_email) || (privacyDetails && privacyDetails.hideEmail) || false}
                            render={({field: {onChange, value}}) => (
                                <>
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                        color="default"
                                    />
                                </>
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid item container direction="row">
                    <Labels item xs={6} sm={6} md={3}>
                        Hide occupation? &nbsp;
                    </Labels>
                    <Controller
                        name="hideOccupation"
                        control={formControl}
                        defaultValue={(userData && userData.hide_location) || (privacyDetails && privacyDetails.hideOccupation) || false}
                        render={({field: {onChange, value}}) => (
                            <>
                                <Checkbox
                                    checked={value}
                                    onChange={onChange}
                                    color="default"
                                />
                            </>
                        )}
                    />
                </Grid>

                <Grid item container direction="row">
                    <Labels item xs={6} sm={6} md={3}>
                        Hide company? &nbsp;
                    </Labels>
                    <Grid item xs={6} sm={6} md={2}>
                        <Controller
                            name="hideCompany"
                            control={formControl}
                            defaultValue={(userData && userData.hide_company) || (privacyDetails && privacyDetails.hideCompany) || false}
                            render={({field: {onChange, value}}) => (
                                <>
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                        color="default"
                                    />
                                </>
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid item container direction="row">
                    <Labels item xs={6} sm={6} md={3}>
                        Hide location? &nbsp;
                    </Labels>
                    <Grid item xs={6} sm={6} md={2}>
                        <Controller
                            name="hideLocation"
                            control={formControl}
                            defaultValue={(userData && userData.hide_location || (privacyDetails && privacyDetails.hideLocation) || false)}
                            render={({field: {onChange, value}}) => (
                                <>
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                        color="default"
                                    />
                                </>
                            )}
                        />
                    </Grid>
                </Grid>
            </FormContainer>
            <NewAccountStepNavigator fieldData={Object.keys(formObserver).length === 0 ? privacyDetails : formObserver}
                                     needsValidation={false}
                                     source={source}
            />
        </Wrapper>
    );
};

export default PrivacyDetails;
