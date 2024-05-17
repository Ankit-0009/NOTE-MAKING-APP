import { Note } from "../models/note";
// Service - CRUD logic.
export const noteOperations = {
    notes:[], // Notes Array that hold the objects. (Array of objects)

    // Add Note Function. => Recieve data from Add.jsx to avoid Object Literal.
    addNote(id, title, descr, cdate, importance) { 
        const noteObject = new Note(id, title, descr, cdate, importance);
        this.notes.push(noteObject); // Here we store each object in array.
        console.log(this.notes);
        return noteObject;
    },

    // Retrieve Array of noteObject.
    getNotes() {
        return this.notes;
    }
}