import React from 'react'
import Navbar from '../components/Navbar'
import TagContainer from '../components/TagContainer'
import './TagPage.css'

const TagPage = () => {
    return (
        
<>
        <Navbar/>
        <div className='bodytag'>
            <div className='topqcontainer'>

                <div className='questmain'>
                    <h2>
                        Tags
                    </h2>

                </div>
                <div className='filter_num'>
                    <h4>A tag is a keyword or label that categorizes your question with other, similar questions. <br />
                        Using the right tags makes it easier for others to find and answer your question.</h4>
                </div>
                <div className='searchtag'>
                    <input type='text' placeholder='Search tags' />
                </div>
                <div className="alltags">
                    <h3 className='poptag'>Popular Tags</h3>

                </div>
                <div className='tagcontainer'>
                    <TagContainer />
                </div>






            </div>
        </div>
        </>
    )
}

export default TagPage