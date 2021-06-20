import React, {useEffect} from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import {FormHelperText, Typography} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {countries} from "./utils/countries";
import {enableBeforeUnload} from "./utils/unsavedFormWarning";
import {useForm, Controller} from "react-hook-form";

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

  ${(props) => props.theme.breakpoints.down("sm")} {
    padding-left: 0;
  }
`;

const SectionMessage = styled(Typography)`
  font-size: 1.5rem;

  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 1.5em;
  }
`;

const PersonalDetails = ({
                             setDescription,
                             setOccupationState,
                             setCompany,
                             setPosition,
                             setInputLocation,
                             setLocation,
                             description,
                             occupationState,
                             company,
                             position,
                             location,
                             inputLocation,
                             emptyFields,
                         }) => {
    const {register, handleSubmit, watch, control, formState: {errors}} = useForm();
    const fieldStore = watch()

    const [occupation, setOccupation] = React.useState("");

    const handleValues = (value) => {
        if (value !== "Unemployed") {
            setOccupation(value);
            setOccupationState(value);
        } else {
            setOccupation(value);
            setPosition("");
            setCompany("");
            setOccupationState(value);
        }
    };

    const onSubmit = data => {
        console.log(data);
    };

    const getOpObj = option => {
        if (!option.name) option = options.find(op => op.name === option);
        return option;
    };


    return (
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
            {console.log(fieldStore, errors)}
            <SectionMessage variant="h5">
                This information will be shown in your profile dashboard and in your
                contributed stories
            </SectionMessage>

            <FormContainer container direction="column" spacing={4}>
                <Grid item container direction="row">
                    <Labels item xs={12} sm={12} md={3}>
                        Short description about you: &nbsp;
                    </Labels>
                    <Grid item xs={12} sm={12} md={4}>
                        {/*<TextField*/}
                        {/*    {...register("description", {required: true})}*/}
                        {/*    value={description}*/}
                        {/*    onChange={(e) => {*/}
                        {/*        setDescription(e.target.value)*/}
                        {/*        enableBeforeUnload()*/}
                        {/*    }}*/}
                        {/*    onKeyUp={enableBeforeUnload}*/}
                        {/*    fullWidth*/}
                        {/*    variant="outlined"*/}
                        {/*/>*/}

                        {/*<Controller control={control}*/}
                        {/*            render={*/}
                        {/*                ({field: onChange, value}) => <TextField*/}
                        {/*                    {...register("description", {required: true})}*/}
                        {/*                    value={description}*/}
                        {/*                    onChange={onChange}*/}
                        {/*                    onKeyUp={enableBeforeUnload}*/}
                        {/*                    fullWidth*/}
                        {/*                    variant="outlined"*/}
                        {/*                />*/}
                        {/*            }*/}
                        {/*>*/}

                        {/*</Controller>*/}

                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <>
                                    <TextField
                                        label="description"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        onKeyUp={enableBeforeUnload}
                                        error={!!error}
                                    />
                                    <FormHelperText error={!!error}>{error ? error.message : null}</FormHelperText>
                                </>
                            )}
                            rules={{required: 'Last name required'}}
                        />
                    </Grid>
                </Grid>

                <Grid item container direction="row">
                    <Labels item xs={12} sm={12} md={3}>
                        Occupation:* &nbsp;
                    </Labels>
                    <Grid item xs={12} sm={12} md={2}>
                        {/*<Select*/}
                        {/*    fullWidth*/}
                        {/*    variant="outlined"*/}
                        {/*    onChange={(e) => {*/}
                        {/*        e.target.value === "Unemployed"*/}
                        {/*            ? handleValues(e.target.value)*/}
                        {/*            : handleValues(e.target.value);*/}
                        {/*        enableBeforeUnload()*/}
                        {/*    }}*/}
                        {/*    onKeyDown={enableBeforeUnload}*/}
                        {/*    value={occupationState}*/}
                        {/*    error={*/}
                        {/*        emptyFields*/}
                        {/*            ? emptyFields.find((e) => e === "occupation") !== undefined*/}
                        {/*            ? true*/}
                        {/*            : false*/}
                        {/*            : false*/}
                        {/*    }*/}
                        {/*>*/}

                        <Controller
                            name="occupation"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <>
                                    <Select
                                        value={value}
                                        fullWidth
                                        variant="outlined"
                                        onChange={onChange}
                                        onKeyDown={enableBeforeUnload}
                                        defaultValue={occupationState}
                                        error={!!error}
                                    >
                                        <MenuItem value="Student">Student</MenuItem>
                                        <MenuItem value="Employed">Employed</MenuItem>
                                        <MenuItem value="Unemployed">Unemployed</MenuItem>
                                    </Select>
                                    <FormHelperText error={!!error}>{error ? error.message : null}</FormHelperText>
                                </>
                            )}
                            rules={{required: 'Please choose your occupation'}}
                        />

                        {/*    <MenuItem value="Student">Student</MenuItem>*/}
                        {/*    <MenuItem value="Employed">Employed</MenuItem>*/}
                        {/*    <MenuItem value="Unemployed">Unemployed</MenuItem>*/}
                        {/*</Select>*/}
                    </Grid>
                </Grid>

                {fieldStore.occupation === "Unemployed" ? null : (
                    <Grid item container direction="row">
                        <Labels item xs={12} sm={12} md={3}>
                            Company: &nbsp;
                        </Labels>
                        <Grid item xs={12} sm={12} md={2}>
                            <TextField
                                value={company}
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {
                                    setCompany(e.target.value)
                                    enableBeforeUnload()
                                }}
                                onKeyUp={enableBeforeUnload}
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

                {fieldStore.occupation === "Unemployed" ? null : (
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
                                    setPosition(e.target.value)
                                    enableBeforeUnload()
                                }}
                                onKeyUp={enableBeforeUnload}
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
                        Country:* &nbsp;
                    </Labels>
                    <Grid item xs={12} sm={12} md={2}>
                        <Controller
                            render={({field: {onChange, value}, fieldState: {error}, ...props}) => (
                                <>
                                    <Autocomplete
                                        options={countries}
                                        getOptionLabel={option => option.name}
                                        renderOption={option => (
                                            <span>{option.name}</span>
                                        )}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                label="Choose a country"
                                                variant="outlined"
                                                error={!!error}
                                            />
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                        {...props}
                                    />
                                    <FormHelperText error={!!error}>{error ? error.message : null}</FormHelperText>
                                </>
                            )}
                            onChange={([, data]) => data}
                            defaultValue={null}
                            name="country"
                            control={control}
                            rules={{required: 'Please choose a country'}}
                        />
                    </Grid>
                </Grid>
            </FormContainer>
            <Button type={"submit"}>submit</Button>
        </Wrapper>
    );
};

export default PersonalDetails;
