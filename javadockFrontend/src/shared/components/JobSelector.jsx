import {MenuItem, Select} from "@mui/material";
import * as React from "react";

export function JobSelector(props) {
    const {id, labelText} = props;

    return <>
        <div>
            <label htmlFor={id} className="form-label">{labelText}</label>
        </div>
        <div>
            <Select className="form-label"
                    size="small"
                    sx={{marginBottom: 2, width: '1'}}>
                <MenuItem>Ten</MenuItem>
                <MenuItem>Twenty</MenuItem>
                <MenuItem>Thirty</MenuItem>
            </Select>
        </div>
    </>
}

