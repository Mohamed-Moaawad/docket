import React, { useState } from 'react'
import './TaskDetails.css'
import { Container } from 'react-bootstrap'
import TitleTaskDetail from '../components/TaskDetails/TitleTaskDetail'
import SubTaskDetails from '../components/TaskDetails/SubTaskDetails'
import { RotatingLines } from 'react-loader-spinner'

import { useParams } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebaseConfig'

const TaskDetails = () => {
    const [showAllData, setShowAllData] = useState(false)
    
    const [user, loading, error] = useAuthState(auth)
    
    const { id } = useParams()


if(loading){
    return <div className='task-details page'>
            <div className="container-fluid box-container loading">
                <RotatingLines
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
}

    if(user){
        return (
            <div className='task-details'>
                <div className='page'>
                    <div className="container-fluid box-container">
                            {showAllData ?
                                <Container className='d-flex h-100 align-items-center justify-content-center'>
                                    <RotatingLines
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
                                </Container>
                                :
                                <Container>
                                    {/* start Title Task */}
                                    <TitleTaskDetail user={user} id={id}/>
                                    {/* end Title Task */}

                                    {/* start SubTask */}
                                    <SubTaskDetails user={user} id={id} setShowAllData={setShowAllData}/>
                                    {/* end SubTask */}


                                </Container>
                            }
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskDetails
