import React, { useState } from 'react'
import './Login.css'
import { FaRegEye } from 'react-icons/fa'
import { PiEyeClosedBold } from 'react-icons/pi'
import { IoClose } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";


import { Link, useNavigate } from 'react-router-dom'
// Firebase
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [eyePass, setEyePass] = useState(false) // Eye Icons in Password

    const [accept, setAccept] = useState(false) // All input
    const [checkEmail, setCheckEmail] = useState(false) // '@' && '.'
    const [invalidData, setInvalidData] = useState(false) // Data is not invalid

    const [showResetBox, setShowResetBox] = useState(false)
    const [resetPass, setResetPass] = useState('')
    const [sendMessage, setSendMessage] = useState(false)




    const navigate = useNavigate()


    // function--> Eye Password Show And Hidden
    const showPass = ()=>{
        setEyePass(eyePass === false ? true : false)
    }
    // function--> Login User 
    const logInUser = (e)=>{
        e.preventDefault()
        // setAccept(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user);
            navigate('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            console.log(errorCode);
            // ==================
            //  validation
            // ==================
            if(errorCode === 'auth/invalid-email'){
                setAccept(true)
            }
            if(errorCode === 'auth/invalid-email' && email !== '' && !email.includes('@' && '.')){
                setCheckEmail(true)
            }
            if(errorCode === 'auth/invalid-credential'){
                setInvalidData(true)
            }
        });
    }
    // function--> Forgot Password
    const sendEmailForgot = (e)=>{
        e.preventDefault()
        sendPasswordResetEmail(auth, resetPass)
        .then(() => {
            // Password reset email sent!
            // ..
            setResetPass('')
            setSendMessage(true)
            
            setTimeout(()=>{
                setSendMessage(false)
            },3000)
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        });
    }

    return (
        <div>
            <div className="login-page page">
                <div className="container-fluid box-container">
                    <form>
                        {/* Email */}
                        <input type="email" placeholder='Email' 
                            value={email}
                            onChange={(e)=> {
                                setEmail(e.target.value)

                                if(checkEmail){
                                    setCheckEmail(false)
                                }
                                if(invalidData){
                                    setInvalidData(false)
                                }
                            }}
                            />
                            {email === '' && accept && <span className='error'>Email is Required</span>}
                            {checkEmail && <span className='error'>Email is incorrect</span>}
                        
                        {/* Password */}
                        <div className="pass mt-3">
                            <input type={eyePass? "text" : "password"} placeholder='Password' 
                                value={password}
                                onChange={(e)=> {
                                    setPassword(e.target.value)

                                    if(invalidData){
                                        setInvalidData(false)
                                    }
                                }}
                            />
                            <div className="icon" onClick={showPass}>
                                {eyePass ? <FaRegEye/> : <PiEyeClosedBold/> }
                            </div>
                        </div>
                        {password === '' && accept && <span className='error'>Password is Required</span>}
                        {invalidData && <span className='error'>Check your email address or password for typos.</span>}
                            
                            {/* Button */}
                        <h6 className='forgot-pass' 
                            onClick={()=> setShowResetBox(true)}
                        >
                            forgot password ?
                        </h6>
                        <button onClick={logInUser}>log in</button>
                        <p>Don`t have an account? <Link to='/sign-up'>sign up</Link></p>
                    </form>
                </div>
                {showResetBox && <div className="forgot-box">
                    <form>
                        <div className='close' 
                            onClick={()=>setShowResetBox(false)}
                        ><IoClose /></div>
                        <input type="text" placeholder='Your Email'
                            value={resetPass}
                            onChange={(e)=>{
                                setResetPass(e.target.value)
                            }}
                        />
                        <button onClick={sendEmailForgot}>send</button>
                    </form>
                    <p className='send-message' 
                    style={{right: sendMessage ? '0px': '-500px'}}>
                        Password reset email sent! <IoIosCheckmarkCircleOutline />
                    </p>
                </div>
                }

            </div>
        </div>
    )
}

export default Login
