import logo from './logo.svg';
import './App.css';
import ProjectTranslator from './pages/ProjectTranslatorView'
import ProjectClient from './pages/ProjectClientView'
import { Routes, Route, BrowserRouter} from "react-router-dom";
import MilestoneTranslator from './pages/MilestoneTranslatorView';
import MilestoneClient from './pages/MilestoneClientView';
import Translator from './pages/TranslatorView';
import Client from './pages/ClientView';
import Navigation from './pages/Nav';
import LandingPage from './pages/landing';

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
        <div className='top-bar'>
            <div className='logo-image'></div>
           <Navigation />
=======
    <div className='top-bar'>
          <div className='logo-image'></div>
          <div className='search-bar'>
            <div className='search-image'></div>
            <input type="text"></input>
          </div>
        <div className='login-and-signup'>
          <button className='login'>Log In</button>
          <button className='signup'>Sign Up</button>
>>>>>>> d737348362bff44f1047ee086b82a31d32263d91
        </div>
        <Routes>
            <Route path="/translator/milestones/:milestonename" element={<MilestoneTranslator/>}></Route>
            <Route path="/translator/projects/:projectname" element ={<ProjectTranslator/>}></Route>
            <Route path="/translator" element = {<Translator/>}></Route>
            <Route path="/client" element = {<Client/>}></Route>
            <Route path="/client/milestones/:milestonename" element={<MilestoneClient/>}></Route>
            <Route path="/client/projects/:projectname" element ={<ProjectClient/>}></Route>
            <Route path="/" element={<LandingPage/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
