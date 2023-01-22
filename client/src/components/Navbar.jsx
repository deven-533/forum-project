import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {
    const navigate = useNavigate()

    return (
        <div className='navbarflex'>
            <div>

                <img src=''></img>
            </div>
            <div>

                <h1>Forum</h1>
            </div>
            <div>
                <ul>
                    <li><Link to='/'>Questions</Link></li>
                    <li><Link to='/tags'>Tags</Link></li>
                    <li><Link to='/users'>Users</Link></li>
                </ul>
            </div>
            <div>
                <input placeholder='Search..'></input>
                <button className='regbtn' onClick={()=>{navigate('/login')}}>Login</button>
                <button className='regbtn' onClick={()=>{navigate('/register')}}>Register</button>
            </div>
        
        </div>

    )
}

export default Navbar