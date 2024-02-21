import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
//
export default function Milestone(){
    let {milestonename} = useParams();
    const [milestone,setMilestone] = useState({})
            useEffect(()=>{
                axios.get(`http://localhost:5000/milestones/${milestonename}`,{headers:{'Access-Control-Allow-Origin': true}}).then((response)=>{
                    setMilestone(response.data)
                }).catch(error=>{console.error(error)})

            },)

    return (<>
        <div>{milestone.name}</div>
        <div>{milestone.time}</div>
        <div>{milestone.funds}</div>
        <div>{milestone.description}</div>
        </>);
};