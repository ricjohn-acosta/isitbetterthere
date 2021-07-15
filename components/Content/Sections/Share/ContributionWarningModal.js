import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const ContributionWarningModal = ({modalView, setModalView, from, to}) => {
    const handleClose = () => {
        setModalView(false);
    };
    return (
        <Dialog onClose={handleClose} open={modalView}>
            <DialogTitle>Thank you for contributing!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    It looks like you've already contributed your transition story from{" "}
                    <b>{from}</b> to <b>{to}</b>. You can view/update your story <a href="/account?tab=contributions"
                                                                                    target="_blank">here!</a>{" "}
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
