import {Autocomplete, TextField} from "@mui/material";
import * as React from "react";
import http from "@/lib/http.js";
import {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import _ from 'lodash';

export function UniversitySelector(props) {
    const {t} = useTranslation();
    const {id, labelText, onChange, defaultValue} = props;
    const [universities, setUniversities] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedUniversity, setSelectedUniversity] = useState(defaultValue || null);

    function loadUniversities(searchTerm = "") {
        return http.get(`/api/v1/universities`, {
            params: {
                search: searchTerm
            }
        });
    }

    const getUniversities = useCallback(_.debounce(async (term) => {
        const response = await loadUniversities(term);
        setUniversities(response.data);
    }, 300), []);

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        getUniversities(newInputValue);
    };

    const handleChange = (event, newValue) => {
        setSelectedUniversity(newValue); // Yeni değeri ayarla
        onChange(newValue ? newValue.universityId : ""); // Seçilen üniversiteyi yukarıya ilet
        setInputValue(newValue ? newValue.universityName : ""); // Seçim yapıldığında ismi ayarla
    };

    const handleClear = () => {
        setSelectedUniversity(null); // Seçimi sıfırla
        setInputValue(""); // Input değerini sıfırla
        onChange(""); // Boş bir değer gönder
    };

    useEffect(() => {
        // Varsayılan değeri ayarlama
        setSelectedUniversity(defaultValue);
        setInputValue(defaultValue ? defaultValue.universityName : ""); // Varsayılan değeri input'a yerleştir
    }, [defaultValue]);

    return (
        <div>
            <label htmlFor={id} className="form-label">{labelText}</label>
            <Autocomplete
                id={id}
                value={selectedUniversity}
                onChange={handleChange}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                options={universities}
                getOptionLabel={(option) => option.universityName || ""}
                isOptionEqualToValue={(option, value) => option.universityId === value.universityId}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        variant="outlined" 
                        size="small" 
                        onKeyDown={(event) => {
                            if (event.key === 'Backspace' && !inputValue) {
                                handleClear(); // Arama değeri boşsa seçimi sıfırla
                            }
                        }}
                    />
                )}
                sx={{marginBottom: 2, width: '100%'}}
                onClear={handleClear} // Clear (çarpı) tıklama fonksiyonu
            />
        </div>
    );
}
