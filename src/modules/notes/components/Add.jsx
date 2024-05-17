import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import TextSnippetSharpIcon from '@mui/icons-material/TextSnippetSharp';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import { noteOperations } from '../../services/note-operations';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { MuiColorInput } from 'mui-color-input'
import dayjs from 'dayjs';
export const Add = (props) => {

    const id = useRef(); // This holds the current id data.
    const title = useRef(); // This holds the current title data.
    const descr = useRef(); // This holds the current descr data.

    // For Date and Color
    const [dateValue, setDateValue] = useState(null);
    const [colorValue, setColorValue] = useState('#ffffff')

    // Invoke when Add Note button click that written below.
    const addNote = () => {
        console.log("The note is added...");
        console.log("The ID is : ", id.current.value);
        console.log("The Title is : ", title.current.value);
        console.log("The Description is : ", descr.current.value);

        // Now wrap all data of (id, title, descr) in a object. (Object Literal)
        // const noteObject = {
        //     "id" : id.current.value,
        //     "title" : title.current.value,
        //     "descr" : descr.current.value
        // }

        // Now we will use the Note class to create the object.
        const idValue = id.current.value;
        const titleValue = title.current.value;
        const descrValue = descr.current.value;
        const date = dateValue ? dayjs(dateValue).format('YYYY-MM-DD') : ''; // If dateValue is null then return empty string.
        // const noteObject = noteOperations.addNote(idValue, titleValue, descrValue, '', '');

        // Sending the noteObject to NotePage.jsx using props.
        // props.fn(noteObject);

        // Here we call the addNote function of services but not store in object.
        // Bcz we made an another function to getNotes() which called at NotePage.jsx
        noteOperations.addNote(idValue, titleValue, descrValue, date, colorValue);
        props.fn(); // This calling show that we call getNotes() when noteObject added.
    }
    
    return(
        <> 
            <Box
                sx={{
                    margin : 5, 
                    flexDirection : "column",
                    display : "flex"                 
                }}>

                {/* This for the Note - ID */}
                <TextField
                    id="note-id"
                    label="Id"
                    inputRef={id}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <DescriptionSharpIcon/>
                        </InputAdornment>
                    ),
                    }}
                    variant="standard"
                />

                {/* This for the Note - Title */}
                <TextField
                    id="note-title"
                    label="Title"
                    inputRef = {title}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <ViewQuiltRoundedIcon/>
                        </InputAdornment>
                    ),
                    }}
                    variant="standard"
                />

                {/* This for the Note - Description */}
                <TextField
                    id="note-descr"
                    label="Description"
                    inputRef = {descr}
                    multiline
                    maxRows={4}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <TextSnippetSharpIcon/>
                        </InputAdornment>
                    ),
                    }}
                    variant="standard"
                />
                    
                {/* This for the Note - Date and Color */}
                {/* <input type="date" /> 
                <input type="color" /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker value={dateValue} onChange={(selectedDate) => setDateValue(selectedDate)} />
                    </DemoContainer>
                </LocalizationProvider>
                <MuiColorInput format="hex" value={colorValue} onChange={(selectedColor) => setColorValue(selectedColor)} />
                    
                {/* This for the Add Note Button */}
                <Button onClick={addNote} variant="outlined" color='success'>Add Note</Button>
            </Box>
        </>
    )
}