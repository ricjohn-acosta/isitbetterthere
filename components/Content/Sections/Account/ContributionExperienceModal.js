import styled, { keyframes } from "styled-components";
import draftToHtml from "draftjs-to-html";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { convertToRaw, convertFromRaw, ContentState } from "draft-js";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Paper, Typography, Button } from "@material-ui/core";
import HeaderDivider from "../common/HeaderDivider";
import { editExperience } from "../../../../store/actions/experiences";
import "../../../../public/editor.css";
import { useSession } from "next-auth/client";
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const Editor = dynamic(() => import("../Share/Editor"), {
  loading: () => null,
  ssr: false,
});

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  background-color: white;
  height: 80vh;
  width: 65vw;
  padding: 2.5%;
  overflow: auto;
`;

const EditorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContributionExperienceModal = ({
  experienceId,
  modalView,
  setModalView,
  storyPreview,
  setStoryPreview,
  rawStoryPreview,
  editExperience,
}) => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(rawStoryPreview)))
  );
  const [editing, setEditing] = React.useState(false);
  const [session, loading] = useSession();

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleClose = () => {
    setModalView(false);
  };

  const handleSave = () => {
    let blocks = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    let updatedStoryPreview = htmlToReactParser.parse(blocks);
    let updatedStory = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    setStoryPreview(updatedStoryPreview);
    editExperience({
      experience_id: experienceId,
      story: updatedStory,
    });
    setEditing(false);
  };

  return (
    <div>
      <StyledModal
        open={modalView}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalView}>
          <StyledPaper>
            <Typography variant="h3">
              Your story&nbsp;
              <Button color="primary" onClick={handleEditing} variant="contained" disableRipple>
                {editing ? "CANCEL" : "EDIT"}
              </Button>
              &nbsp;
              {editing ? (
                <Button color="primary" onClick={handleSave} variant="contained">
                  SAVE
                </Button>
              ) : null}
            </Typography>

            <HeaderDivider />

            {editing ? (
              <EditorContainer>
                <Editor
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </EditorContainer>
            ) : (
              storyPreview
            )}
          </StyledPaper>
        </Fade>
      </StyledModal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    editExperience: (experience) => dispatch(editExperience(experience)),
  };
};

export default connect(null, mapDispatchToProps)(ContributionExperienceModal);
