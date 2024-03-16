import React, { useRef } from 'react'
import './TitleTaskDetail.css'
// React Icons
import { FaEdit } from "react-icons/fa";
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';


const TitleTaskDetail = ({user, id}) => {

    const titleRef = useRef()

    const [value, loading, error] = useDocument(doc(db, user.uid, id))

    // function--> BTN Focus input
    const editInputTitle = ()=>{
        titleRef.current.disabled = false
        titleRef.current.focus()
    }
    // function--> Edit Title Task
    const editTitleTask = async(e)=>{
        await updateDoc(doc(db, user.uid, id),{
            title: e.target.value
        })
    }


    if(value){
        return (
            <div className='title-task-details'>
                <div className="box-input">
                    <input type="text" 
                        defaultValue={value.data().title} 
                        disabled={true}
                        ref={titleRef}
                        onChange={editTitleTask}
                        style={{textDecoration: value.data().complete ? 'line-through wavy' : ''}}
                    />
                    <button onClick={editInputTitle}><FaEdit /></button>
                </div>
            </div>
        )
    }
}

export default TitleTaskDetail
