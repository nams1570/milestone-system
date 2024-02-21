import logo from './logo.svg';
import './App.css';
import Project from './pages/ProjectView'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Milestone from './pages/MilestoneView';

function App() {
  return (
    <BrowserRouter>
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
