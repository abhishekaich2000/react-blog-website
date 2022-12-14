import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { Context } from '../../../context/Context';
import "./login.css"

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value
      });
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"});
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          type="text" className="loginInput" 
          placeholder="Enter your username..."
          ref={userRef}
          required
        />
        <label>Password</label>
        <input 
          type="password" className="loginInput" 
          placeholder="Enter your password..."
          ref={passwordRef}
          required
        />
        <button className="loginSubmitButton" disabled={isFetching}>
          Login
        </button>
        <button className="loginRegisterButton">Register</button>
      </form>
    </div>
  )
}
