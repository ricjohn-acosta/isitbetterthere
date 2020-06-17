import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const Preview = ({ editorState }) => {
  const htmlInput = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const preview = htmlToReactParser.parse(htmlInput);

  return <div>{preview}</div>;
};

export default Preview;
