import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './TranslatorView.css'

export default function Translator()
{
    const [allProj,setallProj] = useState([])
    useEffect(()=>{
            axios.get('http://localhost:5000/projects').then(response=>{
                setallProj(response.data)
            }).catch(error=>{console.error(error)})
    })
    return (<div className='translator-container'>
        <div className='profile-box'>
            <div className='portrait'>
            </div>
            John Doe
        </div>
        <AllProjects allProj={allProj}></AllProjects>
    </div>);
}

function AllProjects({allProj})
{
    const navigate = useNavigate();

    function handleClick(projname)
    {
        navigate(`/projects/${projname.replaceAll(' ','').toLowerCase()}`)
    }
    return (<div className='proj-render'>
        <div className='proj-render-text'>
            Current Projects:
        </div>
        {allProj && allProj.map((projname,index)=>
        <ProjectCard key={index} onClick={()=>handleClick(projname)} projname={projname}></ProjectCard>
        )}
    </div>);
}
function ProjectCard({onClick,projname})
{
    return (
        <button className='project-card' onClick={onClick}>
            {projname}
        </button>
    )
}