import { useEffect, useState } from 'react'
import { getSurvey, reset } from '../features/surveys/surveySlice'
import { getQuestionsBySurvey } from '../features/questions/questionSlice'
import { reset as resetQuestions } from '../features/questions/questionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import AnswerForm from '../components/forms/AnswerForm'
import './css/TakeSurvey.css'
import { FaArrowLeft, FaBackward } from 'react-icons/fa'
import { createAnswer } from '../features/answers/answerSlice'
import { reset as resetAnswers } from '../features/answers/answerSlice'
import { Link } from 'react-router-dom'
import './css/Profile.css'
import clipart from '../assets/survheygraphic3d.png'

const TakeSurvey = () => {
    let { id } = useParams()
    const dispatch = useDispatch()
    const [answer, setAnswer] = useState("")
    const { surveys } = useSelector((state) => state.surveys)
    const { questions } = useSelector((state) => state.questions)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [finished, setFinished] = useState(false)
    const [currentQ, setCurrentQ] = useState(currentIndex)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(reset())
        dispatch(resetQuestions())
        dispatch(resetAnswers())

        dispatch(getSurvey(id))
        dispatch(getQuestionsBySurvey(id))

        return () => {
            dispatch(resetQuestions())
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted")
        setCurrentIndex(currentIndex + 1)
        dispatch(createAnswer({
            survey: surveys._id,
            question: questions[currentQ]._id,
            body: answer,
        }))
        // setCurrentQ(currentIndex)
    }

    useEffect(() => {
        setCurrentQ(currentIndex)
        console.log(currentQ)
    }, [currentIndex])

    if (finished) {
        return (
            <div style={{ backgroundColor: surveys.color, backgroundImage: `linear-gradient(${surveys.color},rgba(0, 0, 0, 0.5))` }} className='contentContainer'>

                <Card type="profile">
                    <img style={{ width: "200px", padding: "30px" }} src={clipart} />
                    <h3>Thanks for your feedback!</h3>
                    <br />
                    <Link style={{width: "100%"}} to="/surveys">
                        <Button variety="regular maxwide">Surveys</Button>
                    </Link>
                </Card>
            </div>
        )
    }
    return (
        <div style={{ backgroundColor: surveys.color, backgroundImage: `linear-gradient(${surveys.color},rgba(0, 0, 0, 0.5))` }} className='contentContainer'>
            {surveys && questions &&
                <>
                    {questions.length > 1 ? (

                        <>

                            <Card type="profile">
                                <h3>{surveys.title}</h3>
                                <span className='survey-owner-info'>
                                    <Link className='survey-owner' to={`/user/${surveys.user}`}>
                                        <div style={{ background: `url(${surveys.ownerImg})`, backgroundPosition: "center", backgroundSize: "cover" }} className='profile-image-img profile-image-img-small'></div>
                                        <h4> {surveys.owner}</h4>
                                    </Link>
                                </span>
                                <p>{questions.length} Questions</p>
                                <p>{surveys.description}</p>
                            </Card>
                            <Card type="profile">
                                <div className='progress-track'>
                                    <div style={{ width: `${(currentIndex / questions.length * 100) + 1}%` }} className='progress-bar'>
                                    </div>
                                </div>
                            </Card>
                            <Card type="profile">
                                {/* {questions.map((question, id) => ( */}
                                <AnswerForm setFinished={setFinished} answer={answer} setAnswer={setAnswer} handleSubmit={handleSubmit} questions={questions} index={currentQ} length={questions.length} id={id} key={id} />
                                {/* // <p key={id}>{question.text}</p> */}
                                {/* // ))} */}

                            </Card>
                        </>
                    ) : (
                        <Card type="profile">
                            <h2>Huh, that's weird. </h2>
                            <h3>This survey has no questions. 😐</h3>
                            <br />
                            <Button onClick={() => { navigate('/surveys') }} variety="regular round"><FaArrowLeft /> &nbsp; Go Back</Button>
                        </Card>
                    )}
                </>
            }
        </div>
    )
}

export default TakeSurvey