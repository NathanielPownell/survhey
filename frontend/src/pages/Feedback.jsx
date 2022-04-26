import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../components/UI/Card'
import { getUserNameImage } from '../features/auth/authSlice'
import { getAnswersBySurvey } from '../features/answers/answerSlice'
import { getQuestionsBySurvey, reset } from '../features/questions/questionSlice'
import {reset as resetAnswers} from '../features/answers/answerSlice'
import { getSurvey } from '../features/surveys/surveySlice'
import './css/Feedback.css'

const Feedback = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { surveys } = useSelector((state) => state.surveys)
    const { questions } = useSelector((state) => state.questions)
    const { answers } = useSelector((state) => state.answers)

    useEffect(() => {
        dispatch(getQuestionsBySurvey(id))
        dispatch(getSurvey(id))
        dispatch(getAnswersBySurvey(id))

        return (() =>{
            dispatch(reset)
            dispatch(resetAnswers)
        } )
    }, [])

    return (
        <div className='contentContainer'>
            <Card type="profile">
                <h3>{surveys.title}</h3>
                <p>{questions.length} questions</p>
                <p>{answers.length / questions.length} participants</p>
            </Card>
            {questions && questions.map((question, id) => (
                <div className="question">
                    <div className='question-question-text'>
                        {id + 1}. {question.text}
                    </div>
                    <Card type="profile">

                        <div className='responses-table'>

                            {answers.length > 1 && answers.map((answer, id) => (
                                <>
                                    {answer.question === question._id ? (

                                        <div className='response-group'>
                                            <div onClick={()=>{navigate(`/user/${answer.user}`)}} className='response-user'>
                                                <img className='profile-image-img profile-image-img-small img-smaller' src={answer.userimage || "https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg"} />{answer.username || "Anonymous"}:
                                            </div>
                                            <div>
                                                <b>{answer.body}</b>
                                            </div>
                                        </div>
                                    ) : ("")}
                                </>
                            ))}
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default Feedback