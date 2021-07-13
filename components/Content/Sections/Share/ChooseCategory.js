import styled from "styled-components";
import CategoryForm from "../Home/CategoryForm";
import {
    careersCategory,
    countryCategory,
    cultureCategory,
    jobCategory,
    lifeCategory,
    secondaryEducationCategory,
    tertiaryEducationCategory,
    uniCategory,
} from "../../../../lib/categories";
import Subheaders from "./common/Subheaders";
import PaperWrapper from "./common/PaperWrapper";
import HeaderDivider from "./common/HeaderDivider";
import {useForm} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import {BackButton, NextButton} from "./ShareStepperNavigator";
import {useSelector} from "react-redux";
import {AlertDialog} from "../../../UI/Notifications/AlertDialog";
import {useDialog} from "../../../../hooks/ui/useDialog";

const Wrapper = styled.div`
  margin: 5%;
`;

const StyledDiv = styled.div`
  margin-top: 5vh;
`;

const ChooseCategory = ({
                            stories,
                            categories,
                            setCategory,
                            currentCategory,
                            setCurrentCategory,
                            toValue,
                            setToValue,
                            toInputValue,
                            setToInputValue,
                            fromValue,
                            setFromValue,
                            fromInputValue,
                            setFromInputValue,
                            isSwapping,
                            setSwapping,
                            isEmptyField,
                        }) => {
    const {watch, control, trigger, setValue, reset} = useForm({
        mode: "all"
    });
    const [dialogOpen, setDialogOpen, toggleDialog] = useDialog();
    const fieldStore = watch()
    const categoryFormData = useSelector((state) => state.shareStory.categoryFormData)

    const handleCategories = (value) => {
        switch (value) {
            case "secondaryEducation":
                setCategory(secondaryEducationCategory);
                setCurrentCategory(value);
                return;

            case "tertiaryEducation":
                setCategory(tertiaryEducationCategory);
                setCurrentCategory(value);
                return;

            case "universities":
                setCategory(uniCategory);
                setCurrentCategory(value);
                return;

            case "careers":
                setCategory(careersCategory);
                setCurrentCategory(value);
                return;

            case "jobs":
                setCategory(jobCategory);
                setCurrentCategory(value);
                return;

            case "countries":
                setCategory(countryCategory);
                setCurrentCategory(value);
                return;

            case "cultures":
                setCategory(cultureCategory);
                setCurrentCategory(value);
                return;

            case "life":
                setCategory(lifeCategory);
                setCurrentCategory(value);
                return;

            default:
                break;
        }
    };

    return (
        <Grid container direction={'row'}>
            <BackButton/>
            <Grid item xs={10} justify={'center'} alignItems={'center'}>
                <PaperWrapper>
                    <Subheaders icon={"/swap.png"}>
                        What transition would you like to talk about?
                    </Subheaders>
                    <HeaderDivider/>
                    <Wrapper>
                        <StyledDiv>
                            <CategoryForm
                                experiences={stories}
                                categories={categories}
                                currentCategory={currentCategory}
                                handleCategories={handleCategories}
                                setCategory={setCategory}
                                setToValue={setToValue}
                                setToInputValue={setToInputValue}
                                setFromValue={setFromValue}
                                setFromInputValue={setFromInputValue}
                                setSwapping={setSwapping}
                                toValue={toValue}
                                toInputValue={toInputValue}
                                fromValue={fromValue}
                                fromInputValue={fromInputValue}
                                isSwapping={isSwapping}
                                isEmptyField={isEmptyField}

                                resetFields={reset}
                                fieldStore={fieldStore}
                                formHelper={setValue}
                                control={control}
                                source={"ChooseCategory"}
                            />
                        </StyledDiv>
                    </Wrapper>
                </PaperWrapper>
            </Grid>
            <NextButton fieldData={Object.keys(fieldStore).length === 0 ? categoryFormData : fieldStore}
                        toggleDialog={toggleDialog}
                        validator={trigger}/>
            <AlertDialog open={dialogOpen}
                         close={() => setDialogOpen(false)}
                         title={'Thanks for contributing!'}
                         body={<>
                             You have already shared your story about transitioning
                             from <b>{fromInputValue}</b> to <b>{toInputValue}</b>! Would you like to add more to your
                             story?
                         </>}
                         actions={[
                             {action: 'Edit your story', handler: () => setDialogOpen(false)},
                             {action: 'Close', handler: () => setDialogOpen(false)}]}/>
        </Grid>
    );
};

export default ChooseCategory;
