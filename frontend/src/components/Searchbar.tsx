import {TextField} from "@mui/material";
import React from "react";

interface SearchText {
    onSearchbarChange?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Searchbar({onSearchbarChange}: SearchText) {
    return (
        <TextField
            sx={{p: 0.25, m: 0.25, width: '100%'}}
            variant={'filled'}
            label="Search Organization"
            type="search"
            onChange={
                event => onSearchbarChange ? onSearchbarChange(event.target.value) : console.log("Error")
            }
        />
    )
}