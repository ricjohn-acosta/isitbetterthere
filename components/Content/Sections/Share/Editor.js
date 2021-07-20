import React from "react";
import {Editor} from "react-draft-wysiwyg";

const EditorConvertToHTML = ({editorState, setEditorState}) => {

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
