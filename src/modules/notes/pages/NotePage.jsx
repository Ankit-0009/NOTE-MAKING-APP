import { useState } from "react";
import { Header } from "../../../shared/components/Header"
import { Add } from "../components/Add"
import { List } from "../components/List"
import Container from '@mui/material/Container';
export const NotePage = () => {

    // React has VDOM, so rerendering is requried of page therefore here use of useState.
    const [value, setValue] = useState({}); // De - structuring 

    // Function that used to recieve Note-Object from Add.jsx
    const collectNoteData = (noteObject) => {
        setValue(noteObject); // It tells that VDOM changes applied in DOM.
        console.log("The Recieving Object from Add.jsx : ", noteObject);
    }

    return (
        <Container fixed>
            <Header/>
            <Add fn = {collectNoteData}/> 
            <List note = {value}/>
        </Container>
    )
}

// Container used to show whole page in a container with fixed property.
// Add tag has an attribute fn.