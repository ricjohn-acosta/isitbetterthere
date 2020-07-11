import styled, { keyframes } from "styled-components";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Paper, Typography } from "@material-ui/core";
import HeaderDivider from "../common/HeaderDivider";
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();
import draftToHtml from "draftjs-to-html";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  background-color: white;
  height: 50vh;
  width: 50vw;
  padding: 2.5%;
  overflow: auto;
`;

const HelpfulStoryModal = ({
  name,
  hideName,
  story,
  modalView,
  setModalView,
}) => {
  const storyPreview = htmlToReactParser.parse(draftToHtml(JSON.parse(story)));
  const handleClose = () => {
    setModalView(false);
  };

  return (
    <StyledModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
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
            {hideName === 0 ? name : "Anon"}'s story
          </Typography>
          <HeaderDivider />
          {storyPreview}
        </StyledPaper>
      </Fade>
    </StyledModal>
  );
};

export default HelpfulStoryModal;
