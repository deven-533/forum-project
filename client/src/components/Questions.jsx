import React, { useState } from 'react'
import Question from './Question'
import './Questions.css'
import { useNavigate } from 'react-router-dom'
import './Question.css'
import { useEffect } from 'react'
import axios from 'axios'

const Questions = () => {
    const navigator = useNavigate()
    const [Questions, setQuestions] = useState([])
    const [count,setCount]=useState(0)
    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/questions', { withCredentials: true }).then(function (response) {
            setQuestions(response.data)
            setCount(response.data.count)
            console.log(response.data);
            setQuestions(response.data.questions)

        })
            .catch(function (error) {
                console.log(error);
            });

    }, [])
    return (
        <>

            <div className='topqcontainer'>
                <div className="qcont2">

                    <div className='questmain'>
                        <h2>
                            Top Questions
                        </h2>
                        <button className='askque'>Ask Question</button>
                    </div>
                    <div className='filter_num'>
                        <h3>{count} Questions</h3>
                        <div className='filtercontainer'>

                        </div>

                    </div>
                </div>
                <div className="qmain">
                    <div>

                         {Questions.map((question) => {
                            return (
                                <div key={question._id} className="question">
                                    <div className="question__info">
                                        <div className='question_num'>
                                            <p> Votes</p>
                                            <p> Answers</p>
                                            <p>{question.views} Views</p>
                                        </div>

                                        <div className='question_cont'>
                                            <span className='qtitle' onClick={() => { navigator(`/question/${question._id}`) }}>{question.title}</span>
                                            <p className='qans'>{question.mainQuestion}</p>
                                            <div className="tag_ask">

                                                <div className="questtags"> <span className='tagq'>NodeJS</span>
                                                </div>
                                                <p className='userdate'>Asked by <span></span> on <span>{question.createdAt}</span></p>
                                            </div>
                                        </div>
                                        <div />
                                    </div>
                                </div>
                            )
                        } 

                        )}
                    </div>

                </div>

            </div>


        </>
    )
}

export default Questions