// CRUD
// Back End calls

import axios from 'axios';
// API Calls
export const apiClient = {
    // For Read Data
    async read() {
        // // Promise has different States = Pending, FulFilled, Rejected.
        // const promise = axios.get(process.env.REACT_APP_NOTES_URL); // Async (Non - Blocking)
        // console.log("Promise is", promise);
        // // Promise is a object which has then and catch method.
        // // then is called when promise is fulfilled.
        // // catch is called when promise is rejected.
        // promise.then((response) => {
        //     // console.log("Response is", response.data.notes);  
        //     return response.data.notes;  
        // }).catch((error) => {
        //     // console.log("Error is", error);
        //     throw error;
        // });         
        try {
            const response = await axios.get(process.env.REACT_APP_NOTES_URL);
            return response.data.notes; // [{}, {}, {}]
        } catch (err) {
            throw err;
        }
    },
    // For Create Data
    insert() {

    },
    // For Update Data
    update() {

    },
    // For Delete Data
    remove() {

    }

}