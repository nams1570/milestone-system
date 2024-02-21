import React, {useEffect,useState} from 'react';
import axios from 'axios';
import './ProjectView.css'
import {useNavigate,useParams} from 'react-router-dom';

export default function Project()
{
    //axios request to backend to get proj data
    let {projectname} = useParams();
    const [proj,setProj] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost:5000/projects/${projectname}`,{headers:{'Access-Control-Allow-Origin': true}}).then(response=>{
            //unpack response.data's json into an object
            setProj(response.data)
        }).catch(error=>{ console.error(error)})
    },);
    return (
        <div>
            <h1>{proj.name}</h1>
            <p>{proj.isFulfilled}</p>
            <AllMilestones milestones={proj.milestones}></AllMilestones>
        </div>
    );
}

function AllMilestones({milestones})
{
    const navigate = useNavigate();

    function handleClick(milestonename)
    {
        navigate(`/milestones/${milestonename.replaceAll(' ','').toLowerCase()}`)
    }
    return (
        <div className='all-milestones-display'>

                {milestones && milestones.map((milestone)=>
                    <MilestoneCard onClick={()=>handleClick(milestone.name)} milestone={milestone}></MilestoneCard>
                )}
        </div>
    )
}
function MilestoneCard({onClick, milestone})
{
    return (
        <button className='milestone-container' onClick={onClick}>
            <div className='milestone-name'>{milestone.name}</div>
        </button>
    )
}