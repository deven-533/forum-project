import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Question.css'

const Question = () => {
    const navigator = useNavigate()
    return (
        <div>
            <div className="question">
                <div className="question__info">
                    <div className='question_num'>
                        <p>X Votes</p>
                        <p>X Answers</p>
                        <p>X Views</p>
                    </div>

                    <div className='question_cont'>
                        <span className='qtitle' onClick={()=>{navigator('/question/93287')}}>Question Title</span>
                        <p className='qans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, Lorem ipsum dolor sit amet                    consectetur adipisicing elit. Deleniti assumenda iste omnis eaque eius illo, totam aliquid impedit laborum vitae.</p>
                        <div className="tag_ask">

                        <div className="questtags"> <span  className='tagq'>NodeJS</span>
                            </div>
                        <p className='userdate'>Asked by <span>user</span> on <span>date</span></p>
                        </div>
                    </div>
                    <div />
                </div>
            </div>
        </div>
    )
}
export default Question