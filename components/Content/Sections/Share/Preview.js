import styled from "styled-components";
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";
import PaperWrapper from "./common/PaperWrapper";
import HeaderDivider from "./common/HeaderDivider";
import Subheaders from "./common/Subheaders";
import {useSelector} from "react-redux";
import {BackButton, NextButton} from "./ShareStepperNavigator";
import React from "react";
import Grid from "@material-ui/core/Grid";

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const StyledPaper = styled.div``;

const Preview = ({editorState}) => {
    const editorData = useSelector((state) => state.shareStory.editorData)

    const htmlInput = draftToHtml(convertToRaw(editorData.editor.getCurrentContent()));
    const preview = htmlToReactParser.parse(htmlInput);

    return (
        <Grid container direction={'row'}>
            <BackButton/>
            <Grid item xs={10} justify={'center'} alignItems={'center'}>
                <PaperWrapper>
                    <Subheaders icon={"/preview.png"} variant="h4">
                        Preview
                    </Subheaders>
                    <HeaderDivider/>
                    <StyledPaper>{preview}</StyledPaper>
                </PaperWrapper>
            </Grid>
            <NextButton/>
        </Grid>
    );
};

export default Preview;
