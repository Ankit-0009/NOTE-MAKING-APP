import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalRecords } from '../../modules/notes/redux/note-slice';
export const Header = () => {
  // Using dispatch hook to calling the getTotalRecords metheod from noteSlice.js
  const dispatch = useDispatch();
  // Using useSelector hook to get the total from the centralized store.
  const {total} = useSelector((state) => state.noteSlice);
  // useEffect is used to call the getTotalRecords method from noteSlice.js
  useEffect(() => {
    dispatch(getTotalRecords());
  });
    return(
      <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            NOTE TAKING APP
          </Typography>
          <Typography>
            Total Notes: {total} &nbsp;&nbsp;&nbsp;
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    )
}