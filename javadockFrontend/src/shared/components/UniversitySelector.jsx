import {MenuItem, Select, FormHelperText} from "@mui/material";
import * as React from "react";
import http from "@/lib/http.js";
import {useCallback, useEffect, useState} from "react";

export function UniversitySelector(props) {
    const {id, labelText, onChange, error} = props;
    const [jobs, setJobs] = useState([]);

    function loadJobs() {
        return http.get("/api/v1/jobs")
    }

    const getJobs = useCallback(async () => {
        const response = await loadJobs()
        setJobs(response.data)
        console.log(response.data)
    }, [])

    useEffect(() => {
        getJobs()
    }, [])

    return <>
        <div>
            <label htmlFor={id} className="form-label">{labelText}</label>
        </div>
        <div>
            <Select className="form-label"
                    defaultValue=""
                    size="small"
                    onChange={onChange}
                    sx={{marginBottom: 2, width: '1'}}
                    error={error}>
                {jobs.map(job => {
                    return <MenuItem key={job.jobId} value={job.jobId}>{job.jobName}</MenuItem>
                })}
            </Select>
        </div>
    </>
}

