import {useState, useEffect} from 'react';
import PartnerTile from './PartnerTile';
import {PartnerData} from '../types';
import Searchbar from "./Searchbar.tsx";
import {
    Box,
    Button,
    Container, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {
    const [data, setData] = useState<PartnerData>([])
    const [searchFilter, setSearchData] = useState<string>('');
    const [openCreate, setOpenCreate] = useState(false);

    const [active, setActive] = useState<boolean>();
    const [name, setName] = useState<string>();
    const [logo, setLogo] = useState<string>();
    const [description, setDescription] = useState<string>();

    // Load all partners on initial page load
    useEffect(() => {
        fetch('http://localhost:4000', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then(data => setData(data))
    }, [])

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = (modified?: boolean) => {
        if (! modified) {
            setOpenCreate(false);
            return;
        }

        if (active === undefined || name === undefined || logo === undefined || description === undefined) {
            return;
        }

        createPartner();

        setActive(undefined);
        setName(undefined);
        setLogo(undefined);
        setDescription(undefined);

        setOpenCreate(false);
    };

    const createPartner = () => {
        fetch('http://localhost:4000/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ active: active, name: name, thumbnailUrl: logo, description: description})
        })
            .then((res) => res.json())
            .then(data => setData(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Container sx={{p: 4, m: 1, width: "90vw", border: 0}}>
            <Typography sx={{pb: 2, fontFamily: 'Segoe UI'}} variant={"h2"}>Code 4 Community Projects</Typography>
            <Container sx={{border: 0}}>
                <Searchbar onSearchbarChange={setSearchData}/>
                <Button onClick={handleClickOpenCreate} variant={"outlined"}>Add New Partner</Button>
                <Dialog
                    open={openCreate}
                    onClose={() => handleCloseCreate}
                    hideBackdrop={false}
                >
                    <DialogTitle id="alert-dialog-title">
                        Modify Fields.
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            sx={{p: 0.25, m: 0.25, width: '100%'}}
                            variant={'filled'}
                            select
                            label="Currently Active"
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
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            sx={{p: 0.25, m: 0.25, width: '100%'}}
                            variant={'filled'}
                            label="Logo"
                            type="search"
                            helperText={"Logo must be a URL"}
                            onChange={(e) => setLogo(e.target.value)}
                        />
                        <TextField
                            sx={{p: 0.25, m: 0.25, width: '100%'}}
                            variant={'filled'}
                            label="Organization Description"
                            multiline
                            rows={4}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCloseCreate()} color={"error"}>Cancel</Button>
                        <Button onClick={() => handleCloseCreate(true)} variant="outlined" autoFocus>Confirm</Button>
                    </DialogActions>
                </Dialog>
                {Object.entries(data).filter(function ([str, _]) {
                    return str?.toLowerCase()?.includes(searchFilter.toLowerCase())
                }).map(([key, partner], index) => {
                    if (index % 2 === 0) {
                        return (
                            <Box
                                key={key}
                                sx={{
                                    p: 0.25,
                                    m: 0.25,
                                    py: 4,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    border: 0,
                                    borderColor: 'primary.main'
                                }}>
                                <PartnerTile partner={partner} key={key} updateData={setData}/>
                            </Box>
                        )
                    } else {
                        return (
                            <Box
                                key={key}
                                sx={{
                                    p: 0.25,
                                    m: 0.25,
                                    py: 4,
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                    border: 0,
                                    borderColor: 'primary.main'
                                }}>
                                <PartnerTile partner={partner} updateData={setData} key={key}/>
                            </Box>
                        )
                    }
                })}

            </Container>
        </Container>

    )
}

export default Dashboard;