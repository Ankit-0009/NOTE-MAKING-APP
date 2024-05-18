import logo from './logo.svg';
import './App.css';
import { NotePage } from './modules/notes/pages/NotePage';
import { DashBoard } from './modules/dashborad/pages/DashBoard';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    // BrowserRouter is HOF - Higher Order Function for routing.
    <BrowserRouter> 
      <DashBoard/>
    </BrowserRouter>
  );
}

export default App;
