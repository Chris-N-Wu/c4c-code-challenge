import {
    Box,
    Button,
    Card, CardMedia,
    Chip,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider, MenuItem,
    Stack, TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {PartnerDetails} from "../../../backend/src/types.ts";
import {PartnerData} from "../types.ts";

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

// interface PartnerTileProps {
//   partnerData: PartnerData
// }

interface Props {
    updateData: React.Dispatch<React.SetStateAction<PartnerData>>,
    partner: PartnerDetails
}

function PartnerTile(props: Props) {
    const [openDelete, setOpenDelete] = useState(false);
    const [openModify, setOpenModify] = useState(false);

    const [active, setActive] = useState<boolean>();
    const [name, setName] = useState<string>();
    const [logo, setLogo] = useState<string>();
    const [description, setDescription] = useState<string>();

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = (projectName?: string) => {
        if (projectName) {
            deleteItem(projectName);
        }

        setOpenDelete(false);
    };

    const handleClickOpenModify = () => {
        setOpenModify(true);
    };
    const handleCloseModify = (modified?: boolean) => {
        if (modified) {
            if (active === undefined) {
                setActive(props.partner.active);
            }

            if (name === undefined) {
                setName(props.partner.name);
            }

            if (logo === undefined) {
                setLogo(props.partner.thumbnailUrl);
            }

            if (description === undefined) {
                setDescription(props.partner.description);
            }

            console.log(active);
            console.log(name);
            console.log(logo);
            console.log(description);

            modifyItem(props.partner.name);
        }


        // Reset
        setActive(undefined);
        setName(undefined);
        setLogo(undefined);
        setDescription(undefined);

        setOpenModify(false);
    }

    const deleteItem = (projectName: string) => {
        fetch("http://localhost:4000/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({organization: projectName})
        })
            .then((res) => res.json())
            .then(data => props.updateData(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const modifyItem = (projectName: string) => {
        fetch('http://localhost:4000/update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                originalName: projectName,
                active: active,
                name: name,
                thumbnailUrl: logo,
                description: description
            })
        })
            .then((res) => res.json())
            .then(data => props.updateData(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Card sx={{width: {xs: "100%", md: "80%", lg: "70%"}}}>
            <CardMedia
                component="img"
                height="200"
                sx={{objectFit: "contain"}}
                image={props.partner.thumbnailUrl}
            />
            <Box sx={{p: 2}}>
                <Stack className={"mb-4"} direction={"row"} spacing={1}>
                    {props.partner.active ?
                        <Chip variant="outlined" color="primary" label={"Active"}/> :
                        <Chip variant="outlined" color="error" label={"Inactive"}/>
                    }
                </Stack>
                <Typography gutterBottom variant="h5" component="div">
                    {props.partner.name}
                </Typography>
                <Typography sx={{
                    maxHeight: '150px',
                    overflowY: 'auto',
                    padding: '8px',
                }} variant={"body2"} color={"text.secondary"}>
                    {props.partner.description}
                </Typography>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <Stack direction={"row"} justifyContent="space-between">
                    <Button size={"small"} onClick={handleClickOpenModify}>Modify</Button>
                    <Button size={"small"} onClick={handleClickOpenDelete}>Delete</Button>
                    {/*<PartnerDialog/>*/}
                    <Dialog
                        open={openDelete}
                        onClose={() => handleCloseDelete}
                        hideBackdrop={false}
                    >
                        <DialogTitle id="alert-dialog-title">
                            Confirm Action
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This action is irreversible! The content will be permanently deleted.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseDelete(props.partner.name)} color={"error"}>Yes</Button>
                            <Button onClick={() => handleCloseDelete()} variant="outlined" autoFocus>No</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openModify}
                        onClose={() => handleCloseModify}
                        hideBackdrop={false}
                    >
                        <DialogTitle id="alert-dialog-title">
                            Modify Fields
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                sx={{p: 0.25, m: 0.25, width: '100%'}}
                                variant={'filled'}
                                select
                                label="Currently Active"
                                defaultValue={props.partner.active ? 10 : 20}
                                onChange={(e) => setActive(e.target.value === "Active")}
                            >
                                <MenuItem value={10}>Active</MenuItem>
                                <MenuItem value={20}>Inactive</MenuItem>
                            </TextField>
                            <TextField
                                sx={{p: 0.25, m: 0.25, width: '100%'}}
                                variant={'filled'}
                                label="Organization / Partner"
                                type="search"
                                defaultValue={props.partner.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                sx={{p: 0.25, m: 0.25, width: '100%'}}
                                variant={'filled'}
                                label="Logo"
                                type="search"
                                helperText={"Logo must be a URL"}
                                defaultValue={props.partner.thumbnailUrl}
                                onChange={(e) => setLogo(e.target.value)}
                            />
                            <TextField
                                sx={{p: 0.25, m: 0.25, width: '100%'}}
                                variant={'filled'}
                                label="Organization Description"
                                multiline
                                rows={4}
                                defaultValue={props.partner.description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseModify()} color={"error"}>Cancel</Button>
                            <Button onClick={() => handleCloseModify(true)} variant="outlined"
                                    autoFocus>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            </Box>
        </Card>
    )
}

export default PartnerTile;