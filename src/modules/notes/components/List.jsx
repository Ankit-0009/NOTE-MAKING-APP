import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNotes, getTotalRecords, searchNote, sortNote } from '../redux/note-slice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { apiClient } from '../../../shared/services/api-client';
export const List = (props) => {

    const dispatch = useDispatch(); // Hook jo data le kr aaega from note-slice.js
    const noteObject = useSelector(state => {
        console.log("State --------", state);
        return {'notes':state.noteSlice.notes, 'total':state.noteSlice.total, 'result':state.noteSlice['search-result'], 'isLoding':state.noteSlice.isLoding};
    }); // Pull
    // Component (HTML page) mount(jab page pr aaega).
    // Life Cycle Methods
    // There are many hook for life cycle. 
    // It is called useEffect.
    useEffect(() => {
      // Component Mount
      dispatch(getTotalRecords()) // Push
      apiClient.read(); // Just for testing now.
      dispatch(fetchNotes());
    }, []);

    // This is the function which will take the search value from the user.
    const takeSearchValue = (event) => {
        const searchValue = event.target.value;
        console.log(searchValue);
        // Now dispatch the data for noteSlice.js 
        // The data send in dispatch must be an object of searchData.
        const searchData = {'search':searchValue};
        dispatch(searchNote(searchData)); // Now data has send to noteSlice.js
    }

    // This is the function which will sort the notes.
    const [sort, setSort] = useState('');
    const sortIt = (event) => {
        const sortBy = event.target.value;
        console.log(sortBy);
        setSort(sortBy);
        // Now dispatch the data for noteSlice.js
        // The data send in dispatch must be an object of sortData.
        const sortData = {'sort':sortBy};
        dispatch(sortNote(sortData));
    }
    
    // This is styled table block of code.
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    return(
        <div>
            <h1>Total Records : {noteObject.total}</h1>
            {noteObject.isLoding ? <p>Loading...</p>:<p>Data Comes...</p>}
            {/* TextField for the search the note */}
            <TextField onChange={takeSearchValue} label="Search by Title" variant="outlined" />

            {/* Select for the sorting of notes */}
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Age"
                onChange={sortIt}
              >
            <MenuItem value='id'>By id</MenuItem>
            <MenuItem value='title'>By title</MenuItem>
            <MenuItem value='descr'>By Description</MenuItem>
            </Select>

            {/* Table for the notes */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align='left'>Id</StyledTableCell>
                    <StyledTableCell align="left">Title</StyledTableCell>
                    <StyledTableCell align="center">Description</StyledTableCell>
                    <StyledTableCell align="right">Completion Date</StyledTableCell>
                    <StyledTableCell align="right">Importance</StyledTableCell>
                    <StyledTableCell align="right">Operations</StyledTableCell> 
                </TableRow>
                </TableHead>
                <TableBody>
                    {/* Now print those records who has search by user */}
                    {noteObject.result.length > 0 && noteObject.result.map((note) => {
                     return( <StyledTableRow key={note.id}>
                          <StyledTableCell component="th" scope="row">
                              {note.id}
                          </StyledTableCell>
                          <StyledTableCell align="left">{note.title}</StyledTableCell>
                          <StyledTableCell align="center">{note.descr}</StyledTableCell>
                          <StyledTableCell align="right">{note.cdate}</StyledTableCell>
                          <StyledTableCell align="right">{note.importance}</StyledTableCell>
                          <StyledTableCell align="right"><DeleteIcon/>&nbsp; &nbsp; &nbsp;<ModeEditIcon/></StyledTableCell>
                      </StyledTableRow>)
                    })}
                    {noteObject.result.length == 0 && noteObject.notes.map((note) => (
                        <StyledTableRow key={note.id}>
                            <StyledTableCell component="th" scope="row">
                                {note.id}
                            </StyledTableCell>
                            <StyledTableCell align="left">{note.title}</StyledTableCell>
                            <StyledTableCell align="center">{note.descr}</StyledTableCell>
                            <StyledTableCell align="right">{note.cdate}</StyledTableCell>
                            <StyledTableCell align="right">{note.importance}</StyledTableCell>
                            <StyledTableCell align="right"><DeleteIcon/>&nbsp; &nbsp; &nbsp;<ModeEditIcon/></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
                    
        </div>
    )
}