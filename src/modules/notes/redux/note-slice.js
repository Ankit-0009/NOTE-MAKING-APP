import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../shared/services/api-client";


// Establishing the connection between api-client.js and note-slice.js(RTX)
export const fetchNotes = createAsyncThunk('notes/fetch', async() => {
    try {
        const response = await apiClient.read(); // HTTP Call
        console.log("Response is", response);
        return response; // From response, we only return notes data.
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// This is the centralized store. This is the place where we are going to store the data.
const noteSlice = createSlice({
    name: "noteslice", // Name of slice.
    initialState: { // At initial state notes is empty.
        'notes': [], // Initial it is a blank array.
        'total': 0,
        'search-result': [],
        'isLoding' : true, // Flag 
        'err' : null
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
            // Now data has come from the takeSearchValue() in action.
            const searchObject = action.payload;
            console.log("Search Object", searchObject);
            state['search-result'] = state.notes.filter(note => note.title.includes(searchObject.search));
        },
        sortNote (state, action) {
            const sortObject = action.payload;
            const key = sortObject.sort;
            state.notes.sort((first, second) => { // These first and second are work as object
                if(key == 'id') {
                    return first[key] - second[key]; 
                }
                else {
                    return first[key].localeCompare(second[key]);
                }
            })
        },
        getTotalRecords (state, action) {
            state.total = state.notes.length;
        }
    },
    // extraReducers for async functions
    extraReducers:(builder)=>{
        builder.addCase(fetchNotes.pending,(state, action) => {
            state.isLoding = true;
            console.log('pending...', action.payload);
        })
        .addCase(fetchNotes.fulfilled, (state,action)=>{
            state.isLoding = false;
            state.notes = action.payload; // Array of Objects.
            console.log('fulfilled...', action.payload);
        })
        .addCase(fetchNotes.rejected, (state, action)=>{
            state.isLoding = false;
            state.notes = [];
            console.log('rejected...', action.payload);
            state.err = action.payload;
        })
    }
});
export const {addNote, removeNote, getTotalRecords, searchNote, sortNote} = noteSlice.actions; // Components calling these actions.
export default noteSlice.reducer; // Reducer jo hai vo store se baat krega. That's why it is mentioned in ConfigureStore.