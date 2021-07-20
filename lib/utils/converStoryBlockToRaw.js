import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";
import {Parser} from "html-to-react"

export default (story) => {
    const parser = new Parser()

    // const htmlInput = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    return parser.parse(draftToHtml(JSON.parse(story)))
}