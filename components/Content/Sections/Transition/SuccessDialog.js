import Dialog from "@material-ui/core/Dialog";

const SuccessDialog = (props) => {
  const {open, close, hasReported, handleReportSuccessClose} = props

  return (
    <Dialog
        open={open}
        onClose={close}
      // open={hasReported}
      // onClose={handleReportSuccessClose}
      aria-labelledby="form-dialog-title"
    >
      Your report has been submitted and will be looked at.
    </Dialog>
  );
};

export default SuccessDialog;
