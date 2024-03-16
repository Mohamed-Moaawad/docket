import React, { useEffect, useState } from 'react'
import './Home.css'
import SideBar from '../components/SideBar'
// Firebase-hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebaseConfig';
import AllTasks from '../components/AllTasks';

import { doc, setDoc } from 'firebase/firestore';

import { IoClose } from "react-icons/io5";

// React Spinners
import { InfinitySpin, RotatingLines, ThreeCircles } from 'react-loader-spinner'
import { Link } from 'react-router-dom';



const Home = () => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [taskTitle, setTaskTitle] = useState('')
    const [subTask, setSubTask] = useState('')
    const [array, setArray] = useState([])
    
    const [loadingIcon, setLoadingIcon] = useState(false)

    const [user, loading, error] = useAuthState(auth);


    // function--> Add SubTask
    const addSubTask = (e)=>{
        e.preventDefault()
        if(!array.includes(subTask) && array !== ''){
            array.push(subTask)
        }
        setSubTask('')
    }
    // function--> Send Data for FireStore
    const submitTask = async (e)=>{
        e.preventDefault()

        setLoadingIcon(true)
        const taskId = new Date().getTime()
        await setDoc(doc(db, user.uid, `${taskId}`),{
            id: taskId,
            title: taskTitle,
            details: array,
            complete: false
        })
        setLoadingIcon(false)
        setArray([])
        setTaskTitle('')
        setShowAddTask(false)
    }









    // function--> Change Title Name in Window
    const docTitle = document.title
    window.addEventListener('blur', ()=>{
        document.title = 'Come Back 😢'
    })
    window.addEventListener('focus', ()=>{
        document.title = docTitle
    })




    if(loading){
        return(
            <div className='home-page page'>
                <div className='container-fluid not-user'>
                    <RotatingLines
                    className='spinner-loading'
                        visible={true}
                        height="200"
                        // width="200"
                        strokeColor="#222222"
                        strokeWidth="3"
                        animationDuration="0.7"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        )
    }


    if(user){
        return (
            <div className='home-page page'>
                <div className='container-fluid home-container'>

                    {/* start Sidebar */}
                    <SideBar setShowAddTask={setShowAddTask}/>
                    {showAddTask && <div className="add-task">
                        <form>
                            <div className='close-add-task'
                                onClick={()=>{
                                    setShowAddTask(false)
                                }}>
                                <IoClose />
                            </div>
                            <input type="text" placeholder='Title' 
                                value={taskTitle}
                                onChange={(e)=>{
                                    setTaskTitle(e.target.value)
                                }}
                            />
                            <div className="add-items">
                                <input type="text" placeholder='details' 
                                    value={subTask}
                                    onChange={(e)=>{
                                        setSubTask(e.target.value)
                                    }}
                                />
                                <button onClick={addSubTask}>add</button>
                            </div>
                            <ul>
                                {array.map((item)=>(
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <button className='submit' onClick={submitTask}>
    
                                {loadingIcon ? <RotatingLines
                                className='spinner-loading'
                                    visible={true}
                                    height="20"
                                    width="20"
                                    strokeColor="#fff"
                                    strokeWidth="3"
                                    animationDuration="0.7"
                                    ariaLabel="rotating-lines-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    />
                                :
                                'submit'
                                }
                            </button>
                        </form>
                    </div>}
                    {/* end Sidebar */}

                    <div className="content">
                                <h1></h1>
                        <div className="tasks">
                            <AllTasks user={user} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }



    if(!user && !loading){
        return <div className='home-page page'>
            <div className='container-fluid not-user'>
                <h3 className='create-account'>please create an account <Link to='/sign-up'>create account</Link></h3>
            </div>
        </div>
    }

}

export default Home
