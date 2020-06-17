import styled from "styled-components";
import dynamic from "next/dynamic";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Typography from "@material-ui/core/Typography";

const Wrapper = styled.div`
  min-height: 50vh;
`;

const Editor = dynamic(() => import("./Editor"), {
  loading: () => null,
  ssr: false,
});

const ShareStory = ({ editorState, setEditorState, toValue, fromValue }) => {

  return (
    <Wrapper>
      <Typography component="div" variant="h5">
        Share what you felt about transitioning from <b>{fromValue}</b> to <b>{toValue}</b>
      </Typography>
      <br />
      <Typography variant="subtitle1">
        The more detailed it is the more impact you could make to someone's life
        😉
      </Typography>
      <br />
      <Editor editorState={editorState} setEditorState={setEditorState} />
    </Wrapper>
  );
};

export default ShareStory;
