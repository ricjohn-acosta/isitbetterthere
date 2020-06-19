import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import styled from "styled-components";

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const Wrapper = styled.div`
margin: 0 15% 0 15% 
`;


const Preview = ({ editorState }) => {
  const htmlInput = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const preview = htmlToReactParser.parse(htmlInput);

  return <Wrapper>{preview}</Wrapper>;
};

export default Preview;
