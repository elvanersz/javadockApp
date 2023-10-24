import {MenuItem, Select} from "@mui/material";
import * as React from "react";
import http from "@/lib/http.js";
import {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export function JobSelector(props) {
    const {t} = useTranslation();
    const {id, labelText, onChange, defaultValue} = props;
    const [jobs, setJobs] = useState([]);

    function loadJobs() {
        return http.get("/api/v1/jobs")
    }

    const getJobs = useCallback(async () => {
        const response = await loadJobs()
        setJobs(response.data)
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
                    defaultValue={defaultValue == null ? "" : defaultValue}
                    size="small"
                    onChange={onChange}
                    sx={{marginBottom: 2, width: '1'}}>
                <MenuItem value={0}>{t("iDoNotWantToSpecify")}</MenuItem>
                {jobs.map(job => {
                    if(!job.jobId == 0) {
                        return <MenuItem key={job.jobId} value={job.jobId}>{job.jobName}</MenuItem>
                    }
                })}
            </Select>
        </div>
    </>
}

