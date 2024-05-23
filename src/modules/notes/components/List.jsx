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
import { noteOperations } from '../../services/note-operations';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTotalRecords } from '../redux/note-slice';
export const List = (props) => {

    const dispatch = useDispatch(); // Hook jo data le kr aaega from note-slice.js
    const noteObject = useSelector(state => {
        return {'notes':state.noteSlice.notes, 'total':state.noteSlice.total};
    }); // Pull
    // Component (HTML page) mount(jab page pr aaega).
    // Life Cycle Methods
    // There are many hook for life cycle. 
    // It is called useEffect.
    useEffect(() => {
      // Component Mount
      dispatch(getTotalRecords()) // Push
    }, []);

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
                    {noteObject.notes.map((note) => (
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