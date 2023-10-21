import * as React from 'react';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';


export default function BasicDatePicker(props) {
    const {id, labelText, value, onChange} = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <label htmlFor={id} className="form-label mb-0">{labelText}</label>
            <DemoContainer components={['DatePicker']}
                           sx={{marginBottom: 2, width: '1'}}>
                <DatePicker
                    value={value}
                    onChange={onChange}
                    slotProps={{textField: {size: 'small'}}}
                    sx={{width: '1'}}
                    disableFuture={true}/>
            </DemoContainer>
        </LocalizationProvider>
    );
}