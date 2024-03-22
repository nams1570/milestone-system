
import React, {useEffect, useState, fs} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './view.css'

export default function Translator()
{
    const [allProj,setallProj] = useState([])
    useEffect(()=>{
            axios.get('http://localhost:5000/projects').then(response=>{
                setallProj(response.data)
            }).catch(error=>{console.error(error)})
    })

    return (
        <div className='translator-container'>
            <div className='profile-box'>
                <div className='portrait-client'>
                </div>
                <p>Arthur Morgan</p>
                <p>Client</p>
                <ProjectCreator></ProjectCreator>
            </div>
            <AllProjects allProj={allProj}></AllProjects>
        </div>
    );
}

function AllProjects({allProj})
{
    const navigate = useNavigate();

    function handleClick(projname)
    {
        navigate(`/client/projects/${projname.replaceAll(' ','').toLowerCase()}`)
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

function ProjectCreator()
{
    const [status, setStatus] = useState("initial");
    const [showTextBoxes, setShowTextBoxes] = useState(false);
    const [milestone,setMilestone] = useState({})
    const [numMilestones, setNumMilestones] = useState(0);

    const handleAddTextBox = () => {
        setShowTextBoxes(true);
    };

    const handleNumMilestonesChange = (event) => {
        setNumMilestones(parseInt(event.target.value));
    };


    const handleUpload = async (fileData) => {
        if (fileData) {
            console.log("Uploading file...");
            setStatus("uploading");
            const formData = new FormData();
            formData.append("file", fileData);
        
            try {
                const result = await axios.post(`http://localhost:5000/addproj`, fileData, {});
        
                // const data = await {...result.data};
                setStatus("success");
                } catch (error) {
                setStatus("fail");
                }
          }
      };

    function Result({ status }){
        if (status === "success") {
            return <p>✅ Project posted!</p>;
        } else if (status === "fail") {
            return <p>❌ Failed to create project!</p>;
        } else if (status === "uploading") {
            return <p>⏳ Uploading project...</p>;
        } else {
            return null;
        }
    };
    
    return (
        <div>
            <input type='number' placeholder='Number of Milestones' onChange={handleNumMilestonesChange} />
            <button className='create_proj_button' onClick={handleAddTextBox} disabled={showTextBoxes}>Set up Project</button>
            {showTextBoxes && (
                <div>
                    <input type='text' placeholder='Project Name' />
                    <input type='text' placeholder='Description' />
                    {[...Array(numMilestones)].map((_, index) => (
                        <div key={index}>
                            <input type='text' placeholder='Description' />
                            <input type='text' placeholder='Funds' />
                            <input type='text' placeholder='Name' />
                            <input type='text' placeholder='Time' />
                        </div>
                    ))}
                    <button className='create_proj_button' onClick={() => {
                        const projectData = {
                            name: document.querySelector('input[placeholder="Project Name"]').value,
                            isFullfilled: false,
                            description: document.querySelector('input[placeholder="Description"]').value,
                            milestones: [...Array(numMilestones)].map((_, index) => ({
                                name: document.querySelectorAll('input[placeholder="Name"]')[index].value,
                                time: document.querySelectorAll('input[placeholder="Time"]')[index].value,
                                funds: document.querySelectorAll('input[placeholder="Funds"]')[index].value,
                                description: document.querySelectorAll('input[placeholder="Description"]')[index + 1].value,
                                isFullfilled: false,
                                projName: document.querySelector('input[placeholder="Project Name"]').value.toLowerCase().replace(/\s/g, '')
                            }))
                        };
                        const fileName = document.querySelector('input[placeholder="Project Name"]').value + '.json';
                        // alert('Project created' + JSON.stringify(projectData));
                        handleUpload(projectData);
                    }}>Create Project</button>
                    <Result status={status}></Result>
                    
                </div>
            )}
        </div>
    );

    function validateInputs() {
        const inputs = document.querySelectorAll('input[type="text"]');
        for (let i = 0; i < inputs.length; i++) {
            alert(inputs[i].value)
            if (inputs[i].value === '') {
                return false;
            }
        }
        return true;
    }
}

 // <div>
        //     <input type='text' placeholder='Project Name'></input>
        //     <input type='text' placeholder='Description'></input>
        //     <input type='text' placeholder='Time Allotted'></input>
        //     <input type='text' placeholder='Funds'></input>
        //     <input type='text' placeholder='Milestones'></input>
        //     <button onClick={handleAddTextBox}>Add Text Box</button>
        //     {showTextBoxes && (
        //         <div>
        //             <input type='text' placeholder='Description' />
        //             <input type='text' placeholder='Funds' />
        //             <input type='text' placeholder='Name' />
        //             <input type='text' placeholder='Time' />
        //         </div>
        //     )}
        //     <button className='create_proj_button'>Create Project</button>
        // </div>