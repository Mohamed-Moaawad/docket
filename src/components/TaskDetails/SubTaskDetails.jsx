import React, { useState } from 'react'
import './SubTaskDetails.css'
// React Icons
import { MdDelete } from "react-icons/md";
import { useDocument } from 'react-firebase-hooks/firestore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import BTNTaksDetails from './BTNTaksDetails';
import Moment from 'react-moment';


const SubTaskDetails = ({user, id, setShowAllData}) => {
    const [showAddItem, setShowAddItem] = useState(false)
    const [itemName, setItemName] = useState('')

    const [value, loading, error] = useDocument(doc(db, user.uid, id))
    
    // function--> Edit Complete Task by Input Checkbox 
    const editComplete = async(e)=>{
        console.log('waiting..........');
        if(e.target.checked){
            await updateDoc(doc(db, user.uid, id),{
                complete: true
            })
        }else{
            await updateDoc(doc(db, user.uid, id),{
                complete: false
            })
        }
        console.log('Done..........');
    }

    // function--> Add New Item In Array 
    const addItemInArray = async()=>{
        if(itemName != ''){
            await updateDoc(doc(db, user.uid, id),{
                details: arrayUnion(itemName)
            })
        }
        setItemName('')
    }

    // function--> Delete Item From Array
    const deleteItemFromArray = async(item)=>{
        console.log('waiting......');
        await updateDoc(doc(db, user.uid, id),{
            details: arrayRemove(item)
        })
        console.log('Item Deleted......');
        
    }
    
    if(value){
        return (
            <div className='sub-task-details'>

                {/* start time-and-status */}
                <div className="time-and-status">

                    <p className='date'><Moment date={value.data().id} fromNow/></p>

                    <label className="lable-container">
                        <input type="checkbox" 
                            onChange={editComplete}
                            checked={value.data().complete} 
                        />
                        <div className="checkmark"></div>
                        <span>Completed</span>
                    </label>
                </div>
                {/* end time-and-status */}

                {/* start items */}
                <ul>
                    {value.data().details.map((item)=>(
                        <li key={item}> 
                            <h6>{item}</h6>
                            <button onClick={()=>{
                                deleteItemFromArray(item)
                            }}><MdDelete /></button>
                        </li>
                    ))}

                    {/* start add item */}
                    {showAddItem && <li className='add-item'>
                        <input type="text" placeholder='add'
                            value={itemName}
                            onChange={(e)=>{
                                setItemName(e.target.value)
                            }}/>

                        <button className='add'
                            onClick={addItemInArray}
                        >add</button>

                        <button className='cancel' 
                            onClick={()=>{
                                setShowAddItem(false)
                            }}>
                                cancel
                        </button>
                    </li>
                    }
                    {/* end add item */}

                </ul>
                {/* end items */}

                {/* start BTN Task */}
                    <BTNTaksDetails setShowAddItem={setShowAddItem} user={user} id={id} setShowAllData={setShowAllData}/>
                {/* end BTN Task */}
            </div>
        )
    }
}

export default SubTaskDetails
