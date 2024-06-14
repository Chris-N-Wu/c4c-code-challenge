import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";

interface Props {
    onDialogChange?: (newType: boolean) => boolean;
}

export default function PartnerDialog({onDialogChange}: Props) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
        </>
        // <Dialog
        //     open={onDialogChange}
        //     onClose={onDialogChange(false)}
        //     aria-labelledby="alert-dialog-title"
        //     aria-describedby="alert-dialog-description"
        // >
        //     <DialogTitle id="alert-dialog-title">
        //         Confirm Action
        //     </DialogTitle>
        //     <DialogContent>
        //         <DialogContentText id="alert-dialog-description">
        //             This action is irreversible! The content will be permanently deleted.
        //         </DialogContentText>
        //     </DialogContent>
        //     <DialogActions>
        //         <Button onClick={handleClose} color={"error"}>Yes</Button>
        //         <Button onClick={handleClose} variant="outlined" autoFocus>
        //             No
        //         </Button>
        //     </DialogActions>
        // </Dialog>
    )
}