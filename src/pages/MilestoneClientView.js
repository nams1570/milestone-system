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
    return (<div className='milestone'>
        <h1 className='new-name'>{milestone.name}</h1>
        <h3>Client</h3>
        <div>Time Allotted: {milestone.time}</div>
        <div>Payout: ${milestone.funds}</div>
        <div>{milestone.description}</div>
        {isDisplay?<> <ReviewUploader milestonename={milestonename}></ReviewUploader><h1>Job is Completed. Check Directory for uploaded files</h1> </>:<h1>Job is incomplete.</h1>}
        </div>);
};

function ReviewUploader({milestonename})
{
    const [review,setReview] = useState(null)
    const [status,setStatus] = useState("initial")
    const handleInputChange = (e)=>{
        console.log("triggered")
        console.log(e.target)
        if(e.target.value)
        {
            console.log(e.target.value)
            setReview(e.target.value)
        }
    }

    const handleUpload = async ()=>{
        
        try{
            if(review)
            {
                console.log(milestonename)
                const result = await axios.post(`http://localhost:5000/review/milestones`,{"name":milestonename, "review":review},{headers:{
                    'Content-Type':'application/json'
                }})
                console.log(result)
            }
        }
        catch(error){
            console.error(error)
            setStatus("fail")
        }
    }

    return (
        <>
        <input onChange={handleInputChange}></input>
        <button onClick={handleUpload}>Submit review</button>
        </>
    )

}

function Result({ status }){
    if (status === "success") {
      return <p>✅ Review uploaded successfully!</p>;
    } else if (status === "fail") {
      return <p>❌ Review upload failed!</p>;
    } else if (status === "uploading") {
      return <p>⏳ Uploading Review...</p>;
    } else {
      return null;
    }
  };