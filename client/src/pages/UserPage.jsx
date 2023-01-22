import React from 'react'
import Navbar from '../components/Navbar'
import User from '../components/User'
import './UserPage.css'

const UserPage = () => {
    return (
        <>
            <Navbar />
            <div className="userpage">

                <div className='bodytag'>
                    <div className='topqcontainer'>

                        <div className='questmain'>
                            <h2>
                                Users
                            </h2>

                        </div>
                        {/* <div className='filter_num'>
                    <h4>A tag is a keyword or label that categorizes your question with other, similar questions. <br />
                    Using the right tags makes it easier for others to find and answer your question.</h4>
                </div> */}
                        <div className='userfil'>
                            <input type='text' placeholder='Search Users' />
                            <div className='userfilter'>

                                <button className='userfilterbtn'>Newest</button>
                                <button className='userfilterbtn'>Most Followed</button>
                                <button className='userfilterbtn'>Most Anwered</button>
                            </div>
                        </div>
                        
                        <div className='usercontainer'>
                            <User/>

                        </div>






                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage