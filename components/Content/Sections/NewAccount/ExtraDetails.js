import styled from "styled-components";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {enableBeforeUnload} from "./utils/unsavedFormWarning";
import NewAccountStepNavigator from "./NewAccountStepNavigator";
import {Controller, useForm} from "react-hook-form";
import React from "react";
import {useSelector} from "react-redux";

const Wrapper = styled.div`
  min-height: 15vh;
  margin: 5vh 10vw 2.5vh 2.5vw;
`;

const ExtraDetails = ({setSiteSource, siteSource, emptyFields}) => {
    const {register, watch, control, trigger, formState: {errors}} = useForm({mode: "all"});
    const extraDetails = useSelector((state) => state.newAccountSetup.extraDetailsData)
    const fieldStore = watch()

    return (
        <Wrapper>
            <Typography variant="h5">
                How did you find out about this website?*
            </Typography>
            <br/>
            <Controller
                name="comesFrom"
                control={control}
                defaultValue={(extraDetails && extraDetails.comesFrom) || ""}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                    <>
                        <FormControl variant={"outlined"} fullWidth>
                            <InputLabel error={!!error}>How did you hear about us?</InputLabel>
                            <Select
                                value={value}
                                onChange={(e, data) => {
                                    onChange(data.props.value)
                                    enableBeforeUnload()
                                }}
                                error={!!error}
                                label={'How did you hear about us?'}
                            >
                                <MenuItem value="Word of mouth">Word of mouth</MenuItem>
                                <MenuItem value="Instagram">Instagram</MenuItem>
                                <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                <MenuItem value="Search Engine">Search Engine</MenuItem>
                            </Select>
                        </FormControl>
                        <FormHelperText error={!!error}>{error ? error.message : null}</FormHelperText>
                    </>
                )}
                rules={{required: 'Please choose from one of the selections'}}
            />

            <NewAccountStepNavigator fieldData={Object.keys(fieldStore).length === 0 ? extraDetails : fieldStore} validate={trigger} needsValidation={true}/>
        </Wrapper>
    );
};

export default ExtraDetails;
