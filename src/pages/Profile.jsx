import React from 'react'
import './Profile.css'
import { Container } from 'react-bootstrap'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebaseConfig'
import Moment from 'react-moment'
import { deleteUser } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'

const Profile = () => {
    const [user, loading, error] = useAuthState(auth)

    const navigate = useNavigate()

    // function--> Delete Account
    const deleteAccount = async()=>{
        await deleteUser(user)
        .then(()=>{
            navigate('/sign-up')
        }).catch((error)=>{
            console.log(error);
        })
    }

    if(loading){
        return <div className='profile-page page'>
        <div className="container-fluid box-container">
            <Container>
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
            </Container>
        </div>
    </div>
    }

    if(user){
        return (
            <div className='profile-page page'>
                <div className="container-fluid box-container">
                    <Container>
                        <div className="profile-card">
                            <h3>your account</h3>
                            <ul>
                                <li>username : <span>{user.displayName}</span></li>
                                <li>email : <span>{user.email}</span></li>
                                <li>last sign-in : <span><Moment fromNow date={user.metadata.lastSignInTime} /></span></li>
                                <li>account created : <span><Moment fromNow date={user.metadata.creationTime} /></span></li>
                                <button onClick={deleteAccount}>delete account</button>
                            </ul>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    if(!user && !loading){
        return <div className='profile-page page'>
            <div className="container-fluid box-container">
                <Container>
                    <h3 className='create-account'>please create an account <Link to='/sign-up'>create account</Link></h3>
                </Container>
            </div>
        </div>
    }
}

export default Profile
