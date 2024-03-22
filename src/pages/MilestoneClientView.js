import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import './MilestoneView.css'
//
export default function MilestoneClient(){
    let {milestonename} = useParams();
    const [milestone,setMilestone] = useState({})
            useEffect(()=>{
                axios.get(`http://localhost:5000/milestones/${milestonename}`,{headers:{'Access-Control-Allow-Origin': true}}).then((response)=>{
                    setMilestone(response.data)
                }).catch(error=>{console.error(error)})

            },)
    const isDisplay = milestone.isFulfilled;
    console.log(isDisplay)
    return (<div className='milestone'>
        <h1 className='new-name'>{milestone.name}</h1>
        <h3>Client</h3>
        <div>Time Allotted: {milestone.time}</div>
        <div>Payout: ${milestone.funds}</div>
        <div>{milestone.description}</div>
        {isDisplay?<h1>Job is Completed. Check Directory for uploaded files</h1> :<h1>Job is incomplete.</h1>}
        </div>);
};
