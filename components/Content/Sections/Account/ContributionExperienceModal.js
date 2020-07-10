import styled, { keyframes } from "styled-components";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Paper, Typography, Button } from "@material-ui/core";
import HeaderDivider from "../common/HeaderDivider";

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
const ContributionExperienceModal = ({
  modalView,
  setModalView,
  storyPreview,
}) => {
  const handleClose = () => {
    setModalView(false);
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
              <Button variant="contained" disableRipple>EDIT</Button>
            </Typography>

            <HeaderDivider />
            {storyPreview}
          </StyledPaper>
        </Fade>
      </StyledModal>
    </div>
  );
};

export default ContributionExperienceModal;
