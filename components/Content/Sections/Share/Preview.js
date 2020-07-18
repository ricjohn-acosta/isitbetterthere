import styled from "styled-components";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import PaperWrapper from "./common/PaperWrapper";
import HeaderDivider from "./common/HeaderDivider";
import Subheaders from "./common/Subheaders";

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const StyledPaper = styled.div``;

const Preview = ({ editorState }) => {
  const htmlInput = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const preview = htmlToReactParser.parse(htmlInput);

  return (
    <PaperWrapper>
      <Subheaders icon={"/preview.png"} variant="h4">
        Preview
      </Subheaders>
      <HeaderDivider />
      <StyledPaper>{preview}</StyledPaper>
    </PaperWrapper>
  );
};

export default Preview;
