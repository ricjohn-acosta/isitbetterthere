import Dialog from "@material-ui/core/Dialog";

const SuccessDialog = ({ hasReported, handleReportSuccessClose }) => {
  return (
    <Dialog
      open={hasReported}
      onClose={handleReportSuccessClose}
      aria-labelledby="form-dialog-title"
    >
      test
    </Dialog>
  );
};

export default SuccessDialog;
