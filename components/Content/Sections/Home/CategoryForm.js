import styled from "styled-components";
import {makeStyles} from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {options, uniDirectionFrom, uniDirectionTo} from "../../../utils";
import {Controller} from "react-hook-form";
import {countries} from "../NewAccount/utils/countries";
import {FormHelperText, IconButton, MenuItem, Select, TextField, useMediaQuery} from "@material-ui/core";
import {SwapHoriz, SwapVert} from "@material-ui/icons";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";


const useStyles = makeStyles((theme) => ({
    popper: {width: 400},

    [theme.breakpoints.down("sm")]: {
        popper: {width: 250},
    },
}));

const InputWrapper = styled.div`
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
`;

const CategoryForm = ({
                          experiences,
                          categories,
                          currentCategory,
                          handleCategories,
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

                          resetFields,
                          fieldStore,
                          formHelper,
                          control,
                          source
                      }) => {
    const classes = useStyles();
    const downMD = useMediaQuery("(max-width:959px)");
    const categoryFormData = useSelector((state) => state.shareStory.categoryFormData)

    useEffect(() => {
        if (Object.keys(fieldStore).length === 0) {
            formHelper('direction', "from/to")
        }
    }, [fieldStore])

    useEffect(() => {
        if (!categoryFormData) return
        if (categoryFormData.direction) {
            formHelper('direction', "from/to")
        }
    }, [categoryFormData])

    return (
        <InputWrapper>
            <div>Choose a category: &nbsp;</div>
            <br/>

            <Controller
                render={({field: {onChange, value}, fieldState: {error}, ...props}) => (
                    <Select
                        onChange={(e, data) => {
                            resetFields({...fieldStore, firstInput: null, secondInput: null})
                            onChange(data.props.value)
                            setCategory(e.target.value);
                            handleCategories(e.target.value);
                            setToValue(null);
                            setFromValue(null);
                            setToInputValue("");
                            setFromInputValue("");
                            setSwapping(false);
                        }}
                        value={value}
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
                )}
                defaultValue={(categoryFormData && categoryFormData.category) || "careers"}
                name="category"
                control={control}
                rules={{required: 'Please select an option'}}
            />
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
                defaultValue={((source === "ChooseCategory") && (categoryFormData && categoryFormData.firstInput)) || ""}
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
                            formHelper('direction', isSwapping ? "to/from" : "from/to")
                        }}
                        disabled={currentCategory === "secondaryEducation"}
                    >
                        <SwapVert fontSize="small"/>
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() => {
                            setFromValue(toValue);
                            setToValue(fromValue);
                            setFromInputValue(toInputValue);
                            setToInputValue(fromInputValue);
                            setSwapping(!isSwapping);
                            formHelper('direction', !isSwapping ? "to/from" : "from/to")
                        }}
                        disabled={currentCategory === "secondaryEducation"}
                    >
                        <SwapHoriz fontSize="small"/>
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
                defaultValue={((source === "ChooseCategory") && (categoryFormData && categoryFormData.secondInput)) || ""}
                name="secondInput"
                control={control}
                rules={{required: 'Please select an option'}}
            />
        </InputWrapper>
    );
};

export default CategoryForm;
