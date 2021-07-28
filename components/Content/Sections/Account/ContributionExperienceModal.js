import styled from "styled-components";
import draftToHtml from "draftjs-to-html";
import {connect} from "react-redux";
import dynamic from "next/dynamic";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import {Backdrop, Button, Fade, Modal, Paper, Typography} from "@material-ui/core";
import HeaderDivider from "../common/HeaderDivider";
import {editExperience} from "../../../../store/actions/api/experiences";
import "../../../UI/editor.module.css";
import {useSession} from "next-auth/client";

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

  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

const Header = styled(Typography)`
  font-weight: bold;

  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 2em;
  }
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
            id: experienceId,
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
                        <Header variant="h3">
                            Your story&nbsp;
                            <Button
                                disableElevation
                                color="primary"
                                onClick={handleEditing}
                                variant="contained"
                                disableRipple
                            >
                                {editing ? "CANCEL" : "EDIT"}
                            </Button>
                            &nbsp;
                            {editing ? (
                                <Button
                                    disableElevation
                                    color="primary"
                                    onClick={handleSave}
                                    variant="contained"
                                >
                                    SAVE
                                </Button>
                            ) : null}
                        </Header>

                        <HeaderDivider/>

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
