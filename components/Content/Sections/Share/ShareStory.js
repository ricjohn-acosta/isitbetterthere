import styled from "styled-components";
import dynamic from "next/dynamic";
import "../../../../public/editor.css";
import Typography from "@material-ui/core/Typography";
import Subheaders from "./common/Subheaders";
import PaperWrapper from "./common/PaperWrapper";
import HeaderDivider from "./common/HeaderDivider";
import {Controller, useForm} from "react-hook-form";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import React from "react";

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
                        editorState,
                        setEditorState,
                        toValue,
                        fromValue,
                        shareEmptyState,
                    }) => {
    const {register, watch, control, trigger, setValue, formState: {errors}} = useForm({mode: "all"});
    const fieldStore = watch()
    console.log(fieldStore)

    return (
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
                {shareEmptyState ? (
                    <Typography
                        style={{color: "red"}}
                        component="span"
                        variant="subtitle2"
                    >
                        (required)
                    </Typography>
                ) : null}
                <br/>
                <Controller
                    defaultValue={""}
                    name="editor"
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <>
                            <Editor
                                editorState={value}
                                setEditorState={onChange}
                                // checked={value}
                                // onChange={onChange}
                                // color="default"
                            />
                        </>
                    )}
                />
                {/*<Editor editorState={editorState} setEditorState={setEditorState} />*/}
            </Wrapper>
        </PaperWrapper>
    );
};

export default ShareStory;
