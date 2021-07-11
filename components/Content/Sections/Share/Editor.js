import React, {useState} from "react";
import {EditorState, convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {useForm} from "react-hook-form";

const EditorConvertToHTML = ({editorState, setEditorState}) => {
    // const [editorState, setEditorState] = useState(null);
    //
    // const onEditorStateChange = (editorState) => {
    //     setEditorState(editorState);
    //     // return props.onChange(
    //     //     draftToHtml(convertToRaw(editorState.getCurrentContent()))
    //     // );
    // };

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    return (
        <div>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                handleBeforeInput={(val) => {
                    const textLength = editorState.getCurrentContent().getPlainText()
                        .length;
                    if (val && textLength >= 5000) {
                        return "handled";
                    }
                    return "not-handled";
                }}
                handlePastedText={(val) => {
                    const textLength = editorState.getCurrentContent().getPlainText()
                        .length;

                    if (val.length + textLength >= 5000) {
                        return "handled";
                    } else {
                        return "not-handled";
                    }
                }}
                toolbar={{
                    options: [
                        "inline",
                        "blockType",
                        "fontFamily",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "embedded",
                        "emoji",
                        "image",
                        "remove",
                        "history",
                    ],
                }}
            />
        </div>
    );
};

export default EditorConvertToHTML;
