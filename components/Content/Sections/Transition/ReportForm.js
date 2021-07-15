import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";

const ReportForm = ({
                        reportView,
                        handleReportClose,
                        violationType,
                        handleViolationType,
                        handleReportSubmit,
                        reportedExperiences,
                        currentId,
                        uid,
                        eid,
                    }) => {
    const [clickedSubmit, setClickedSubmit] = React.useState(false);
    const [successDialog, setSuccessDialog] = React.useState(false);

    const hasClickedSubmit = () => {
        setClickedSubmit(true);
        setSuccessDialog(true);
    };

    const hasUserReported = () => {
        return (
            reportedExperiences &&
            !!reportedExperiences.find(
                (e) => e.reported_by === uid && e.experience_id === currentId
            )
        );
    };

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
                <br/>
                {hasUserReported() ? (
                    "Thank you for reporting this submission! We will review your report and take appropriate action."
                ) : (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Violation type:</FormLabel>
                        <RadioGroup value={violationType} onChange={handleViolationType}>
                            <FormControlLabel
                                value="hate"
                                control={<Radio/>}
                                label="This submission contains hateful, violent, or inappropriate content"
                            />
                            <FormControlLabel
                                value="spam"
                                control={<Radio/>}
                                label="This submission contains advertising or spam"
                            />
                            <FormControlLabel
                                value="offtopic"
                                control={<Radio/>}
                                label="This submission is off-topic"
                            />
                        </RadioGroup>
                    </FormControl>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleReportClose} color="primary">
                    Cancel
                </Button>
                {hasUserReported() ? null : (
                    <Button
                        onClick={() => {
                            handleReportSubmit();
                            handleReportClose();
                        }}
                        color="primary"
                    >
                        Submit
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ReportForm;
