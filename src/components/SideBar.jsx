import React from 'react'
import './SideBar.css'
// React Icons
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { IoMdReturnRight } from "react-icons/io";

import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';




const SideBar = ({setShowAddTask}) => {

    const navigate = useNavigate()

    // function--> Log Out
    const logOut = ()=>{
        signOut(auth)
        .then(()=>{
            navigate('/login')
            console.log('Sign-out successful')

        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div className='sidebar-component'>
            <h3>docket</h3>
            <div className="nav">
                {/* start add-btn */}
                <div className="add-btn" 
                onClick={()=>{
                    setShowAddTask(true)
                }}>
                    <FaPlus />
                </div>
                {/* end add-btn */}

                {/* start links */}
                <div className="links">
                    <Link to='/'><IoHome /><span>home</span></Link>
                    <Link to='/profile'><FaRegUserCircle /><span>profile</span></Link>
                </div>
                {/* end links */}

                {/* start btn-log-uot */}
                <div className="btn-log-uot">
                    <button onClick={logOut}> log out <IoMdReturnRight/></button>
                </div>
                {/* end btn-log-uot */}
            </div>
        </div>
    )
}

export default SideBar
