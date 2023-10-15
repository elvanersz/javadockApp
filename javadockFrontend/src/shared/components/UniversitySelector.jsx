import {MenuItem, Select} from "@mui/material";
import * as React from "react";
import http from "@/lib/http.js";
import {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export function UniversitySelector(props) {
    const {t} = useTranslation();
    const {id, labelText, error, onChange} = props;
    const [universities, setUniversities] = useState([]);

    function loadUniversities() {
        return http.get("/api/v1/universities")
    }

    const getUniversities = useCallback(async () => {
        const response = await loadUniversities()
        setUniversities(response.data)
    }, [])

    useEffect(() => {
        getUniversities()
    }, [])

    return <>
        <div>
            <label htmlFor={id} className="form-label">{labelText}</label>
        </div>
        <div>
            <Select className="form-label"
                    size="small"
                    defaultValue=""
                    error={error}
                    onChange={onChange}
                    sx={{marginBottom: 2, width: '1'}}>
                <MenuItem value={0}>{t("iDoNotWantToSpecify")}</MenuItem>
                {universities.map(university => {
                    if(!university.universityId == 0){
                        return <MenuItem key={university.universityId} value={university.universityId}>{university.universityName}</MenuItem>
                    }
                })}
            </Select>
        </div>
    </>
}