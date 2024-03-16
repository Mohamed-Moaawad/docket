import React, { useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { PiEyeClosed } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
// Firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';



const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [eyePass, setEyePass] = useState(false) // Eye Icons in Password

    const [accept , setAccept] = useState(false) // All input
    const [checkEmail , setCheckEmail] = useState(false) // '@' && '.'
    const [lengthPass , setLengthPass] = useState(false) // length Password
    const [alreadyEmail, setAlreadyEmail] = useState(false) // email already

    const navigate = useNavigate()
    // function--> Eye Password Show And Hidden
    const showPass = ()=>{
        setEyePass(eyePass === false? true : false)
    }

    // function--> Create User Account
    const submitUser = (e)=>{
        e.preventDefault()
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            updateProfile(auth.currentUser, {
                displayName: name, 
                // photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(() => {
                navigate('/login')
            }).catch((error) => {
                console.log(error);
            });
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            // ..
            console.log(errorCode);
            // ==================
            //  validation form 
            // ===================
            if(errorCode === 'auth/invalid-email'){
            setAccept(true)
            }
            if(errorCode === 'auth/invalid-email' && email !== '' && !email.includes('@' && '.')){
                setCheckEmail(true)
            }
            if(errorCode === 'auth/email-already-in-use'){
                setAlreadyEmail(true)
            }
            if(errorCode === 'auth/weak-password'){
                setLengthPass(true)
            }
            
        });
    }

    return (
        <div className='sign-up-page page'>
            <div className="container-fluid box-container">
                <form>
                        {/* Name */}
                    <input type="text" placeholder='Username' 
                        value={name} 
                        onChange={(e)=> setName(e.target.value)}
                    />
                    {name === '' && accept && <span className='error'>Username is Required</span>}

                        {/* Email */}
                    <input type="email" placeholder='Email' 
                        className='mt-3'
                        value={email}
                        onChange={(e)=> {
                            setEmail(e.target.value)

                            if(checkEmail){
                                setCheckEmail(false)
                            }
                            if(alreadyEmail){
                                setAlreadyEmail(false)
                            }
                        }}
                        />
                        {email === '' && accept && <span className='error'>Email is Required</span>}
                        {checkEmail && <span className='error'>Email is incorrect</span>} 
                        {alreadyEmail && <span className='error'>An account with this email address already exists. <Link to='/login'>log in</Link></span>}
                        {/* Password */}
                    <div className="pass mt-3">
                        <input type={eyePass? "text" : "password"} placeholder='Password' 
                            value={password}
                            onChange={(e)=> {
                                setPassword(e.target.value)
                                if(password.length < 8){
                                    setLengthPass(false)
                                }
                            }}
                        />
                        <div className="icon" onClick={showPass}>
                            {eyePass ? <FaRegEye/> : <PiEyeClosed/> }
                        </div>
                    </div>
                    {password === '' && accept && <span className='error'>Password is Required</span>}
                    {lengthPass && <span className='error'>Password must be more than 8 Char</span>} 
                        {/* Button */}
                    <button type="submit" onClick={submitUser}>submit</button>
                    <p>Already have an account? <Link to='/login'>log in</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
