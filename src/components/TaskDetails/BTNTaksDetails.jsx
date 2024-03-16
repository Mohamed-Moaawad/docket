import React, { useState } from 'react'
import './BTNTaksDetails.css'
//React Icons
import { FaPlus } from "react-icons/fa6";

import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';


const BTNTaksDetails = ({setShowAddItem, user, id, setShowAllData}) => {

    const navigate = useNavigate()

    // function--> Delete Task
    const deleteTask = async()=>{
        setShowAllData(true)
        await deleteDoc(doc(db, user.uid, id))
        navigate('/', { replace: true })
        
    }

    return (
        <div className='btn-task-details'>

            <button className='delete-btn' 
                onClick={deleteTask}
            >delete task</button>

            <button className='add-btn' 
                onClick={()=>{
                    setShowAddItem(true)
                }}
            >add more <FaPlus /></button>
        </div>
    )
}

export default BTNTaksDetails
