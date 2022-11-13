import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./topbar.css"
import { Context } from '../../context/Context';

export default function Topbar() {
  const {user, dispatch} = useContext(Context);

  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"})
  };

  return (
    <div className='top'>
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to={"/"} className="link">HOME</Link>
          </li>
          <li className="topListItem">
            <Link to={"/about"} className="link">ABOUT</Link>
          </li>
          <li className="topListItem">
            <Link to={"/contact"} className="link">CONTACT</Link>
          </li>
          <li className="topListItem">
            <Link to={"/write"} className="link">WRITE</Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user ? "LOGOUT":  ""}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {
          user ? (
            <Link to="/settings">
              <img className="topImage" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="" />
            </Link>
          ) : (
            <>
            <Link to={"/login"} className="link">
            <li className="topListItem">LOGIN</li>
            </Link>
            <Link to={"/register"} className="link">
              <li className="topListItem">REGISTER</li>
            </Link>
            </>
          )
        }
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}
