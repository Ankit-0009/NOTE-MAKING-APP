import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name: "noteslice", // Name of slice.
    initialState: { // At initial state notes is empty.
        notes: [], // Initial it is a blank array.
        total: 0
    }, 
    reducers: { // Reducers have CRUD operations.
        // Sync Operations
        // action - coming from the component.
        // state - update the centralized store.
        addNote (state, action) {
            const noteObject = action.payload; // This is come frome the Add.jsx
            console.log("Reducer has called of Add-Note", noteObject);
            state.notes.push(noteObject);
        },
        removeNote (state, action) {

        },
        searchNote (state, action) {

        },
        sortNote (state, action) {

        },
        getTotalRecords (state, action) {
            state.total = state.notes.length;
        }
    },
    // extraReducers: {
    //     // Async Operations
    // }
});
export const {addNote, removeNote, getTotalRecords} = noteSlice.actions; // Components calling these actions.
export default noteSlice.reducer; // Reducer jo hai vo store se baat krega. That's why it is mentioned in ConfigureStore.