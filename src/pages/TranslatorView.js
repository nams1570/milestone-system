import React, {useEffect,useState} from 'react';
import axios from 'axios';

export default function Project({projectname})
{
    //axios request to backend to get proj data
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
    return (
        <div className='allMilestones-display'>

                {milestones && milestones.map((milestone)=>
                    <Milestone milestone={milestone}></Milestone>
                )}
        </div>
    )
}
function Milestone({milestone})
{
    return (
        <div className='milestone-container'>
            <div className='milestone-name'>{milestone.name}</div>
            <div className='milestone-fulfilment'>{milestone.isFulfilled}</div>
            <div className='milestone-description'>{milestone.description}</div>
        </div>
    )
}