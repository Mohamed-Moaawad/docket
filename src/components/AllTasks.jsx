import React, { useState } from 'react'
import './AllTasks.css'
import { Col, Container, Row } from 'react-bootstrap'
import { FaPen } from "react-icons/fa";

import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';


const AllTasks = ({user}) => {
    const [activeClass, setActiveClass] = useState(false)
    const [selectValue, setSelectValue] = useState('all-tasks')


    const [initialData, setInitialData] = useState(query(collection(db, user.uid), orderBy('id')))
    // Collection User
    const [value, loading, error] = useCollection(initialData)
    

    // function--> Newest First Data
    const newestFirst = ()=>{
        setActiveClass(true)
        setInitialData(query(collection(db, user.uid), orderBy('id', 'desc')))
    }
    // function--> Oldest First Data 
    const oldestFirst = ()=>{
        setActiveClass(false)
        setInitialData(query(collection(db, user.uid), orderBy('id', 'asc')))
    }
    // function--> Completed And Not-Completed Data
    const completeAndNotComplete = (e)=>{
        if(e.target.value === 'all-tasks'){
            setSelectValue('all-tasks')
            setInitialData(query(collection(db, user.uid), orderBy('id', 'asc')))

        }else if(e.target.value === 'completed'){

            setSelectValue('completed')
            setInitialData(query(collection(db, user.uid), where('complete', '==', true)))
            
        }else if(e.target.value === 'not-completed'){

            setSelectValue('not-completed')
            setInitialData(query(collection(db, user.uid), where('complete', '==', false)))

        }
    }




    if(loading){
        return <div className='all-tasks loading'>
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
    }


    if(value){
        return (
            <div className='all-tasks'>
                <Container>
                    <div className="box-filters">
                        <button className={activeClass ? 'active': ''} 
                            onClick={newestFirst}>
                                Newest first
                        </button>

                        <button className={activeClass ? '' : 'active'}  
                            onClick={oldestFirst}>
                                oldest first
                        </button>
                        <select onChange={completeAndNotComplete} value={selectValue}>
                            <option value="all-tasks">all tasks</option>
                            <option value="completed">completed</option>
                            <option value="not-completed">not completed</option>
                        </select>
                    </div>

                    <Row>
                        {value.docs.map((item)=>(
                            <Col sm={12} md={6} lg={3}  key={item.data().id} className='mt-3 task-parent'>
                            <div className="task" style={{borderBottom: item.data().complete && '5px solid green' }}>
                                <div className="title">
                                    <h3>{item.data().title}</h3>
                                </div>
                                <ul className='items'>
                                    {item.data().details.map((item, index)=>{
                                        if(index < 2){
                                            return <li key={index} className="item1">{item}</li>
                                        }
                                    })}
                                </ul>
                                <div className="footer">
                                    <p className='date'><Moment  date={item.data().id} fromNow /></p>
                                    <Link to={`/task-details/${item.data().id}`}><FaPen /></Link>
                                </div>
                            </div>
                        </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default AllTasks
