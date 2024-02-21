import logo from './logo.svg';
import './App.css';
import Project from './pages/ProjectView'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Milestone from './pages/MilestoneView';

function App() {
  return (
    <BrowserRouter>
    <div className='top-bar'>
          <div className='logo-image'></div>
        <div className='login-and-signup'>
          <button className='login'>Log In</button>
          <button className='signup'>Sign Up</button>
        </div>
    </div>
      <Routes>
        <Route path="/milestones/:milestonename" element={<Milestone/>}>
        </Route>
        <Route path="/" element ={<Project projectname="translationproject"/>}>
        </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
