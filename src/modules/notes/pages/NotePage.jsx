import { useState } from "react";
import { Header } from "../../../shared/components/Header"
import { Add } from "../components/Add"
import { List } from "../components/List"
import Container from '@mui/material/Container';
import { noteOperations } from "../../services/note-operations";
export const NotePage = () => {

    console.log("Note-Page has called"); // Used to check the rerendering of page.

    // React has VDOM, so rerendering is requried of page therefore here use of useState.
    // Here notes is a state variable and setNotes is a function that used to change the state.
    // Here we take arrays of noteObject, so use [] brackets.
    const [notes, setNotes] = useState([]); // De - structuring 

    // Function that used to recieve Note-Object from Add.jsx => Old method.
    // Here this function used to getNotes when noteObject added.
    const collectNoteData = () => {
        // Here we use noteOperations.getNotes() to get the notes.
        // spread used to make a change in real DOM.
        setNotes([...noteOperations.getNotes()]); // It tells that VDOM changes applied in DOM.
        // console.log("The Recieving Object from Add.jsx : ", noteObject);
    }

    return (
        <Container fixed>
            <Header/>
            <Add fn = {collectNoteData}/> 
            <List note = {notes}/>
        </Container>
    )
}

// Container used to show whole page in a container with fixed property.
// Add tag has an attribute fn.