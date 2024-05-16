import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import TextSnippetSharpIcon from '@mui/icons-material/TextSnippetSharp';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRef } from 'react';
export const Add = (props) => {

    const id = useRef(); // This holds the current id data.
    const title = useRef(); // This holds the current title data.
    const descr = useRef(); // This holds the current descr data.

    // Invoke when Add Note button click that written below.
    const addNote = () => {
        console.log("The note is added...");
        console.log("The ID is : ", id.current.value);
        console.log("The Title is : ", title.current.value);
        console.log("The Description is : ", descr.current.value);

        // Now wrap all data of (id, title, descr) in a object.
        const noteObject = {
            "id" : id.current.value,
            "title" : title.current.value,
            "descr" : descr.current.value
        }

        // Sending the noteObject to NotePage.jsx using props.
        props.fn(noteObject);
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
                
                <Button onClick={addNote} variant="outlined" color='success'>Add Note</Button>
            </Box>
        </>
    )
}