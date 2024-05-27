import { Controller } from "react-hook-form"
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { TextField } from "@mui/material";

// This component is made to wrap Date Picker in Controller tag. So that it can show in form validation technique.
export const FormDatePicker = ({control, name}) => {
    const [dateValue, setDateValue] = useState(null);
    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller control={control} name={name} defaultValue={dateValue}
    render={({field})=>{
            // <DemoContainer components={['DatePicker']}>
               return (<DatePicker label="Completion Date" value={dateValue} onChange={(selectedDate) => {field.onChange(selectedDate); setDateValue(selectedDate)}} 
               renderInpt = {(params)=>{
                    return <TextField {...params}/>
               }}
               {...field.restField}
               />);
            // </DemoContainer>
            }}
            />
        </LocalizationProvider>
    
    )
}