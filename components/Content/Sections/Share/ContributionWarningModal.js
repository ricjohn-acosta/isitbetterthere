import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ContributionWarningModal = ({ modalView, setModalView, from, to }) => {
  const handleClose = () => {
    setModalView(false);
  };
  return (
    <Dialog onClose={handleClose} open={modalView}>
      <DialogTitle>Thank you for contributing!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          It looks like you've already contributed your transition story from{" "}
          <b>{from}</b> to <b>{to}</b>. You can view/update your story <a href="/account?tab=contributions">here!</a>{" "}
          <br/>
          <br/>
          We really appreciate your submission and feel free to submit another story!
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionWarningModal;
