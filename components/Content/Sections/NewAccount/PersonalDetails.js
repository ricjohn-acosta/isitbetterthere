import React, {useMemo} from "react";
import styled from "styled-components";
import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {countries} from "./utils/countries";
import {enableBeforeUnload} from "./utils/unsavedFormWarning";
import {Controller, useForm} from "react-hook-form";
import NewAccountStepNavigator from "./NewAccountStepNavigator";
import {useDispatch, useSelector} from "react-redux";
import {setPersonalDetailsData} from "../../../../store/actions/ui/newAccountSetup";

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

const PersonalDetails = () => {
    const {watch, control, trigger, formState: {errors}} = useForm({mode: "all"});
    const fieldStore = watch()
    const dispatch = useDispatch();
    const personalDetails = useSelector((state) => state.newAccountSetup.personalDetailsData)

    const companyField = useMemo(() => {
        if (!fieldStore.occupation && (personalDetails && personalDetails.occupation === 'Unemployed')) return null

        return (fieldStore.occupation !== 'Unemployed' || personalDetails && personalDetails.occupation !== 'Unemployed' ? (
            <Grid item container direction="row">
                <Labels item xs={12} sm={12} md={3}>
                    Company: &nbsp;
                </Labels>
                <Grid item xs={12} sm={12} md={2}>
                    <Controller
                        name="company"
                        control={control}
                        defaultValue={(personalDetails && personalDetails.company) || ""}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <>
                                <TextField
                                    label="company"
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    onKeyUp={enableBeforeUnload}
                                    error={!!error}
                                />
                            </>
                        )}
                    />
                </Grid>
            </Grid>
        ) : null)
    }, [fieldStore, personalDetails])

    const positionField = useMemo(() => {
        if (!fieldStore.occupation && (personalDetails && personalDetails.occupation === 'Unemployed')) return null

        return (fieldStore.occupation !== 'Unemployed' || personalDetails && personalDetails.occupation !== 'Unemployed' ? (
            <Grid item container direction="row">
                <Labels item xs={12} sm={12} md={3}>
                    Position: &nbsp;
                </Labels>
                <Grid item xs={12} sm={12} md={2}>
                    <Controller
                        name="position"
                        control={control}
                        defaultValue={(personalDetails && personalDetails.position) || ""}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <>
                                <TextField
                                    label="position"
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    onKeyUp={enableBeforeUnload}
                                    error={!!error}
                                />
                            </>
                        )}
                    />
                </Grid>
            </Grid>
        ) : null)
    }, [fieldStore, personalDetails])

    return (
        <Wrapper>
            <SectionMessage variant="h5">
                This information will be shown in your profile dashboard and in your
                contributed stories
            </SectionMessage>

            <FormContainer container direction="column" spacing={4}>
                <Grid item container direction="row">
                    <Labels item xs={12} sm={12} md={3}>
                        Country:* &nbsp;
                    </Labels>
                    <Grid item xs={12} sm={12} md={2}>
                        <Controller
                            render={({field: {onChange, value}, fieldState: {error}, ...props}) => (
                                <>
                                    <Autocomplete
                                        // value={value || (personalDetails && personalDetails.country)}
                                        value={value}
                                        options={countries}
                                        getOptionLabel={option => option.name}
                                        renderOption={option => (
                                            <span>{option.name}</span>
                                        )}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                value={value}
                                                label="choose a country"
                                                variant="outlined"
                                                error={!!error}
                                            />
                                        )}
                                        onChange={(e, data) => {
                                            onChange(data)
                                            enableBeforeUnload()
                                        }}
                                        {...props}
                                    />
                                    <FormHelperText error={!!error}>{error ? error.message : null}</FormHelperText>
                                </>
                            )}
                            onChange={([, data]) => data}
                            defaultValue={(personalDetails && personalDetails.country) || ""}
                            name="country"
                            control={control}
                            rules={{required: 'Please choose a country'}}
                        />
                    </Grid>
                </Grid>
                <Grid item container direction="row">
                    <Labels item xs={12} sm={12} md={3}>
                        Occupation:* &nbsp;
                    </Labels>
                    <Grid item xs={12} sm={12} md={2}>
                        <Controller
                            name="occupation"
                            control={control}
                            defaultValue={(personalDetails && personalDetails.occupation) || ""}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <>
                                    <FormControl variant={"outlined"} fullWidth>
                                        <InputLabel error={!!error}>occupation</InputLabel>
                                        <Select
                                            value={value}
                                            onChange={(e, data) => {
                                                onChange(data.props.value)
                                                enableBeforeUnload()
                                            }}
                                            error={!!error}
                                            label={'occupation'}
                                        >
                                            <MenuItem value="Student">Student</MenuItem>
                                            <MenuItem value="Employed">Employed</MenuItem>
                                            <MenuItem value="Unemployed">Unemployed</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormHelperText error={!!error}>{error ? error.message : null}</FormHelperText>
                                </>
                            )}
                            rules={{required: 'Please choose your occupation'}}
                        />
                    </Grid>
                </Grid>
                {companyField}
                {positionField}
                <Grid item container direction="row">
                    <Labels item xs={12} sm={12} md={3}>
                        Bio: &nbsp;
                    </Labels>
                    <Grid item xs={12} sm={12} md={4}>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue={(personalDetails && personalDetails.description) || ""}
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
                                </>
                            )}
                        />
                    </Grid>
                </Grid>

            </FormContainer>
            <NewAccountStepNavigator fieldData={Object.keys(fieldStore).length === 0 ? personalDetails : fieldStore}
                                     validate={trigger} needsValidation={true}/>
        </Wrapper>
    );
};

export default PersonalDetails;
