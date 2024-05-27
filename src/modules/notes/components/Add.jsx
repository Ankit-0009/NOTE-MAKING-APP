import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import TextSnippetSharpIcon from '@mui/icons-material/TextSnippetSharp';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import { useState } from 'react';
import { MuiColorInput } from 'mui-color-input'
import dayjs from 'dayjs';
import { Note } from '../../models/note';
import { addNote } from '../redux/note-slice';
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useForm} from 'react-hook-form';
import { FormControl } from '@mui/material';
import { FormDatePicker } from '../../../shared/components/FormDatePicker';
export const Add = (props) => {

    // Here we use React Form
    const {control, register, handleSubmit, formState:{errors}} = useForm();

    const id = useRef(); // This holds the current id data.
    const title = useRef(); // This holds the current title data.
    const descr = useRef(); // This holds the current descr data.

    // For Date and Color
    const [dateValue, setDateValue] = useState(null);
    const [colorValue, setColorValue] = useState('#ffffff')

    // For SnakBar
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    // Creating onSumbit method
    const onSubmit = (data) => {
        console.log("Data is ----", data);
    }

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // Using Dispatch Hook.
    const Dispatch = useDispatch(); // Retrieve dispatch from useDispatch.
    // Invoke when Add Note button click that written below.
    const takeNote = () => {
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

        const noteObject = new Note(idValue, titleValue, descrValue, date, colorValue);
        Dispatch(addNote(noteObject));

        // For SnakBar
        setOpen(true);

        // const noteObject = noteOperations.addNote(idValue, titleValue, descrValue, '', '');

        // Sending the noteObject to NotePage.jsx using props.
        // props.fn(noteObject);

        // Here we call the addNote function of services but not store in object.
        // Bcz we made an another function to getNotes() which called at NotePage.jsx
        // noteOperations.addNote(idValue, titleValue, descrValue, date, colorValue);
        // props.fn(); // This calling show that we call getNotes() when noteObject added.
    }
    
    return(
        <> 
            <Box
                sx={{
                    margin : 5, 
                    flexDirection : "column",
                    display : "flex"                 
                }}>
                <h1>Add Note</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        {/* Here we use SnakBar to show message when Note has added */}
                        <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message="Note Added"
                            action={action}
                        />

                        {/* This for the Note - ID */}
                        <TextField
                            id="note-id"
                            label="Id"
                            // inputRef={id}
                            {...register('id')}
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
                            // inputRef = {title}
                            {...register('title', {required:true, minLength:3, pattern:/^[a-z]{3,10}/})}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <ViewQuiltRoundedIcon/>
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                        />
                        {/* For showing errors of title Textfield */}
                        {errors.title && errors.title.type === "required" && <span style={{color:'red'}}>Title is required</span>}
                        {errors.title && errors.title.type === "minLength" && <span style={{color:'red'}}>Title Min Length is 3</span>}

                        {/* This for the Note - Description */}
                        <TextField
                            id="note-descr"
                            label="Description"
                            // inputRef = {descr} 
                            {...register('descr', {validate:{
                                checkLength:(value)=>value.length > 6 
                            }})}
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
                        {/* For showing errors of descr Textfield */}
                        {errors.descr && errors.descr.type === "checkLength" && <span style={{color:'red'}}>Description Min Length is 6</span>}
                            
                        {/* This for the Note - Date and Color */}
                        {/* <input type="date" /> 
                        <input type="color" /> */}
                        <FormDatePicker name ="cdate" {...register('cdate')} control = {control} />
                        <MuiColorInput {...register('importance')} format="hex" value={colorValue} onChange={(selectedColor) => setColorValue(selectedColor)} />
                            
                        {/* This for the Add Note Button */}
                        <Button type='submit' variant="outlined" color='success'>Add Note</Button>
                    </FormControl>
                </form>
            </Box>
        </>
    )
}