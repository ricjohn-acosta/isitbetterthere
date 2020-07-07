import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const ReportForm = ({
  reportView,
  handleReportClose,
  violationType,
  handleViolationType,
  handleReportSubmit,
}) => {
  return (
    <Dialog
      open={reportView}
      onClose={handleReportClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Flag as inappropriate</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We want to make sure that the stories people have shared are
          substantial and genuine.
        </DialogContentText>
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">Violation type:</FormLabel>
          <RadioGroup value={violationType} onChange={handleViolationType}>
            <FormControlLabel
              value="hate"
              control={<Radio />}
              label="This submission contains hateful, violent, or inappropriate content"
            />
            <FormControlLabel
              value="spam"
              control={<Radio />}
              label="This submission contains advertising or spam"
            />
            <FormControlLabel
              value="offtopic"
              control={<Radio />}
              label="This submission is off-topic"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReportClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleReportSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportForm;
