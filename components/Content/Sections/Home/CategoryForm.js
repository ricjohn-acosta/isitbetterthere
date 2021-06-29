import styled from "styled-components";
import {makeStyles} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import Button from "@material-ui/core/Button";
import {options, uniDirectionFrom, uniDirectionTo} from "../../../utils";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import {Controller, useForm} from "react-hook-form";
import {countries} from "../NewAccount/utils/countries";
import {FormHelperText} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    popper: {width: 400},

    [theme.breakpoints.down("sm")]: {
        popper: {width: 250},
    },
}));

const InputForm = styled.form`
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0%;
  }

  ${(props) => props.theme.breakpoints.up("lg")} {
    display: flex;
    justify-content: center;
    align-items: center;

  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 200px;
  background: white;
  z-index: 10000;
`;

const CategoryForm = ({
                          experiences,
                          categories,
                          currentCategory,
                          handleCategories,
                          handleForm,
                          setToValue,
                          setToInputValue,
                          setFromValue,
                          setFromInputValue,
                          setSwapping,
                          setCategory,
                          toValue,
                          toInputValue,
                          fromValue,
                          fromInputValue,
                          isSwapping,
                          source,
                      }) => {
    const classes = useStyles();
    const downMD = useMediaQuery("(max-width:959px)");
    const {watch, control, trigger, handleSubmit, formState: {errors}} = useForm({mode: "all"});
    const fieldStore = watch()

    return (
        <InputForm onSubmit={() => {
            handleSubmit(handleForm(fieldStore))
        }} source={source}>
            <div>Choose a category: &nbsp;</div>
            <br/>
            <Select
                onChange={(e) => {
                    setCategory(e.target.value);
                    handleCategories(e.target.value);
                    setToValue(null);
                    setFromValue(null);
                    setToInputValue("");
                    setFromInputValue("");
                    setSwapping(false);
                }}
                value={currentCategory}
                variant="standard"
            >
                <MenuItem value={"secondaryEducation"}>Secondary Education</MenuItem>
                <MenuItem value={"tertiaryEducation"}>Tertiary Education</MenuItem>
                <MenuItem value={"universities"}>Institutions</MenuItem>
                <MenuItem value={"careers"}>Careers</MenuItem>
                <MenuItem value={"jobs"}>Jobs</MenuItem>
                <MenuItem value={"countries"}>Countries</MenuItem>
                <MenuItem value={"cultures"}>Cultures</MenuItem>
                <MenuItem value={"life"}>Life</MenuItem>
            </Select>
            &nbsp;
            <div>
                <b>TRANSITION</b>
            </div>
            {" "}
            &nbsp;
            {/**
             * IF SWAPPING SHOW "FROM" FIELD AND IF NOT SHOW "TO" FIELD AND VICE-VERSA
             */}
            <Controller
                render={({field: {onChange, value}, fieldState: {error}, ...props}) => (
                    <div style={{zIndex: '2'}}>
                        <StyledAutocomplete
                            classes={{
                                paper: classes.popper,
                            }}
                            value={value}
                            onChange={(e, data) => {
                                onChange(data)
                                // isSwapping ? setToValue(data.category) : setFromValue(data.category)
                            }}
                            onInputChange={(event, newInputValue) => {
                                isSwapping
                                    ? setToInputValue(newInputValue)
                                    : setFromInputValue(newInputValue);
                            }}
                            options={options(categories, isSwapping, experiences).sort(
                                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                            )}
                            groupBy={(option) => option.firstLetter}
                            getOptionLabel={(option) => option.category}
                            getOptionSelected={(option, value) =>
                                option.category === value.category
                            }
                            getOptionDisabled={(option) =>
                                !isSwapping
                                    ? option.category === toInputValue ||
                                    uniDirectionTo(option, toInputValue)
                                    : option.category === fromInputValue
                            }
                            inputValue={isSwapping ? toInputValue : fromInputValue}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    value={value}
                                    label={isSwapping ? "to" : "from"}
                                    variant="outlined"
                                    error={!!error}
                                />
                            )}
                        />
                        <FormHelperText error={!!error}>{error ? error.message : null}</FormHelperText>
                    </div>
                )}
                defaultValue={null}
                name="firstInput"
                control={control}
                rules={{required: 'Please select an option'}}
            />
            &nbsp;
            <div>
                {downMD ? (
                    <IconButton
                        onClick={() => {
                            setFromValue(toValue);
                            setToValue(fromValue);
                            setFromInputValue(toInputValue);
                            setToInputValue(fromInputValue);
                            setSwapping(!isSwapping);
                        }}
                        disabled={currentCategory === "secondaryEducation"}
                    >
                        <SwapVertIcon fontSize="small"/>
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() => {
                            setFromValue(toValue);
                            setToValue(fromValue);
                            setFromInputValue(toInputValue);
                            setToInputValue(fromInputValue);
                            setSwapping(!isSwapping);
                        }}
                        disabled={currentCategory === "secondaryEducation"}
                    >
                        <SwapHorizIcon fontSize="small"/>
                    </IconButton>
                )}
            </div>
            &nbsp;
            <Controller
                render={({field: {onChange, value}, fieldState: {error}, ...props}) => (
                    <div style={{zIndex: '2'}}>
                        <StyledAutocomplete
                            classes={{
                                paper: classes.popper,
                            }}
                            value={value}
                            onChange={(e, data) => {
                                onChange(data)
                                // !isSwapping ? setToValue(data.category) : setFromValue(data.category)
                            }}
                            onInputChange={(event, newInputValue) => {
                                !isSwapping
                                    ? setToInputValue(newInputValue)
                                    : setFromInputValue(newInputValue);
                            }}
                            options={options(categories, isSwapping, experiences).sort(
                                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                            )}
                            groupBy={(option) => option.firstLetter}
                            getOptionLabel={(option) => option.category}
                            getOptionSelected={(option, value) =>
                                option.category === value.category
                            }
                            getOptionDisabled={(option) =>
                                !isSwapping
                                    ? option.category === fromInputValue ||
                                    uniDirectionFrom(option, fromInputValue) ||
                                    option.category === "YEAR 9"
                                    : option.category === toInputValue
                            }
                            inputValue={!isSwapping ? toInputValue : fromInputValue}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={!isSwapping ? "to" : "from"}
                                    variant="outlined"
                                    error={!!error}
                                />
                            )}
                        />
                        <FormHelperText error={!!error}>{error ? error.message : null}</FormHelperText>
                    </div>
                )}
                defaultValue={null}
                name="secondInput"
                control={control}
                rules={{required: 'Please select an option'}}
            />
            &nbsp;
            {source === "ChooseCategory" ? null : (
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                    disableElevation
                    disabled={
                        toValue === fromValue &&
                        toValue !== "" &&
                        fromValue !== "" &&
                        toValue !== null &&
                        fromValue !== null
                    }
                >
                    GO
                </Button>
            )}
        </InputForm>
    );
};

export default CategoryForm;
