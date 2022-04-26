import { useState, useEffect } from 'react'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import { useSelector, useDispatch } from 'react-redux'
import './css/Profile.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getUser } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { reset as resetQuestions } from '../features/questions/questionSlice'
import { getUserSurveys } from '../features/surveys/surveySlice'
import Surveys from '../components/Surveys'

const User = () => {
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const { surveys } = useSelector((state) => state.surveys)

    const userId = useParams().id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUser(userId))
        dispatch(getUserSurveys(userId))
        if (user._id === userId) {
            navigate('/profile')
        }

        return () => {
            dispatch(resetQuestions)
        }
    }, [])

    return (
        <div className='contentContainer'>
            {user.viewing ? (

                <>

                    <Card type="profile">

                        <div className='profile-image'>
                            {user.viewing.data.img &&
                                <div className="profile-image-img" style={{ background: `url(${user.viewing.data.img ? user.viewing.data.img : null})`, backgroundSize: "cover" }} />
                            }
                        </div>


                        <h3>{user.viewing.data.name}</h3>
                        <div className='user-stats'>
                            <div>🎂 Member since {new Date(user.createdAt).toLocaleDateString('en-US')}</div>

                            {user.viewing.data.participatedIn > 0 ? (
                                <div>🏅 Participated in {user.viewing.data.participatedIn} survey{user.viewing.data.participatedIn > 1 ? "s" : ""}</div>
                            ) : (
                                <div>💤 {user.viewing.data.name} hasn't participated in any surveys.</div>
                            )}
                        </div>

                    </Card>
                    <h3>{user.viewing.data.name}'s Surveys</h3>
                    <Surveys />
                </>
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default User