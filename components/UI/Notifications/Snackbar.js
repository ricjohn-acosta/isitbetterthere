import React from 'react';
import {Snackbar as MuiSnackbar, Button, IconButton} from "@material-ui/core";
import {Close} from '@material-ui/icons';

const Snackbar = (props) => {

    const {message, open, close} = props

    return (
        <MuiSnackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            onClose={close}
            autoHideDuration={6000}
            message={message}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
                        <Close fontSize="small"/>
                    </IconButton>
                </React.Fragment>
            }
        />
    );
};

export default Snackbar;