import styled from "styled-components";
import dynamic from "next/dynamic";
import "../../../../public/editor.css";
import Typography from "@material-ui/core/Typography";
import Subheaders from "./common/Subheaders";
import PaperWrapper from "./common/PaperWrapper";
import HeaderDivider from "./common/HeaderDivider";
import {Controller, useForm} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {BackButton, NextButton} from "./ShareStepperNavigator";
import {useSelector} from "react-redux";
import {FormHelperText, TextField} from "@material-ui/core";

const Wrapper = styled.div``;

const ShareMessage = styled(Typography)`
  ${(props) => props.theme.breakpoints.down(441)} {
    font-size: 1em;
  }
`;

const Editor = dynamic(() => import("./Editor"), {
    loading: () => null,
    ssr: false,
});

const ShareStory = ({
                        toValue,
                        fromValue,
                    }) => {
    const {register, watch, control, trigger, setError, formState: {errors}} = useForm({mode: "all"});
    const editorData = useSelector((state) => state.shareStory.editorData)
    const fieldStore = watch()

    console.log(fieldStore, errors)
    return (
        <Grid container direction={'row'}>
            <BackButton fieldData={Object.keys(fieldStore).length === 0 ? editorData : fieldStore}/>
            <Grid item xs={10} justify={'center'} alignItems={'center'}>
                <PaperWrapper>
                    <Subheaders icon={"/shareExperience.png"}>Share your story!</Subheaders>
                    <HeaderDivider/>
                    <Wrapper>
                        <ShareMessage component="div" variant="h5">
                            Share your experience transitioning from <b>{fromValue}</b> to{" "}
                            <b>{toValue}</b>
                        </ShareMessage>
                        <br/>
                        <Typography variant="subtitle2">
                            The more detailed your story is the more impact you could make to
                            someone's life 😊
                        </Typography>
                        <br/>
                        <Controller
                            defaultValue={(editorData && editorData.title) || ""}
                            name="title"
                            control={control}
                            render={({field: {onChange, value, error}}) => (
                                <>
                                    <FormHelperText
                                        error={!!errors}>{errors.title ? errors.title.message : null}</FormHelperText>
                                    <TextField
                                        onChange={onChange}
                                        value={value}
                                        placeholder={"Title"}
                                        style={{width: '100%'}}
                                        size="small"
                                        fullwidth
                                        variant="outlined"
                                    />
                                </>
                            )}
                            rules={{required: 'Please write a title', maxLength: {value: 300, message: "Too many characters"}}}
                        />
                        <Controller
                            defaultValue={(editorData && editorData.editor) || ""}
                            name="editor"
                            control={control}
                            render={({field: {onChange, value, error}}) => (
                                <>
                                    <FormHelperText
                                        error={!!errors}>{errors.editor ? errors.editor.message : null}</FormHelperText>
                                    <Editor
                                        editorState={value}
                                        setEditorState={onChange}
                                    />
                                </>
                            )}
                            rules={{required: 'Please write your story'}}
                        />
                    </Wrapper>
                </PaperWrapper>
            </Grid>
            <NextButton fieldData={Object.keys(fieldStore).length === 0 ? editorData : fieldStore}
                        validator={trigger}
                        extraValidator={setError}/>
        </Grid>
    );
};

export default ShareStory;
