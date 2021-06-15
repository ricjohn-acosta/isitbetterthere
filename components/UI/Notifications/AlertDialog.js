import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {useDialog} from "../../../hooks/ui/useDialog";
import {DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from "@material-ui/core";

export const AlertDialog = (props) => {
    const {open, close, title, body, actions} = props

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {actions.map(e => {
                    return <Button onClick={e.handler}>{e.action}</Button>
                })}
            </DialogActions>
        </Dialog>
    );
};

