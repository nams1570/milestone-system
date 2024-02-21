import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import './MilestoneView.css'
//
export default function Milestone(){
    let {milestonename} = useParams();
    const [milestone,setMilestone] = useState({})
            useEffect(()=>{
                axios.get(`http://localhost:5000/milestones/${milestonename}`,{headers:{'Access-Control-Allow-Origin': true}}).then((response)=>{
                    setMilestone(response.data)
                }).catch(error=>{console.error(error)})

            },)

    return (<div className='milestone'>
        <h1 className='new-name'>{milestone.name}</h1>
        <div>Time Allotted: {milestone.time}</div>
        <div>Payout: ${milestone.funds}</div>
        <div>{milestone.description}</div>
        <SingleFileUploader milestone={milestone}/>
        </div>);
};

function SingleFileUploader(milestone){
    const [file, setFile] = useState(null);
    const handleFileChange = (e) =>{
        if(e.target.files)
        {
            setFile(e.target.files[0]);
        }
    }
    const handleUpload = async () => {
        // We will fill this out later
        if (file) {
            console.log("Uploading file...");
        
            const formData = new FormData();
            formData.append("file", file);
        
            try {
              const result = await axios.post(`http://localhost:5000/sendFile`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }}
              );
        
              const data = await {...result.data};
              if(data.success)
              {
                const putResult = await axios.put(`http://localhost:5000/milestones/success`,milestone,{
                    
                })
              }

              console.log(data);
            } catch (error) {
              console.error(error);
            }
          }
      };

    return (
        <>
            <div>
                <label htmlFor="file">Choose a file:</label>
                <input id="file" type="file" onChange={handleFileChange}/>
            </div>
            {file && (
            <section>
            File details:
            <ul>
                <li>Name: {file.name}</li>
                <li>Type: {file.type}</li>
                <li>Size: {file.size} bytes</li>
            </ul>
            </section>
      )}
        {file && <button onClick={handleUpload}>Upload a file</button>}
        </>
    );
}