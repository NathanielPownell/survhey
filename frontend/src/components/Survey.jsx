import React from 'react'
import Card from './UI/Card'
import Button from './UI/Button'
import './Survey.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
const Survey = ({ survey, hidePersonal }) => {
  const { user } = useSelector((state) => state.auth)

  if(hidePersonal && survey.user === user._id){
    return <></>
  }
  return (
    <Card background={`linear-gradient(${survey.color},rgba(255, 255, 255, 0.5))`} type={`survey ${survey.user === user._id ? "isOwner" : ""}`}>

      <div className='survey-title'>
        <h3>{survey.title}</h3>
        <small>{new Date(survey.createdAt).toLocaleString('en-US')}</small>
      </div>
      <p>{survey.description}</p>
      {survey.user === user._id ? (
      <div className='actions'>
        <Button variety="regular"><Link to={`/feedback/${survey._id}`}>View Feedback</Link></Button>
        <Link to={`/edit/${survey._id}`}><Button variety="outlined">Edit &nbsp; <FaEdit /></Button></Link>
      </div>
      ) : (
        <Button variety="regular"><Link to={`/survey/${survey._id}`}>Take Survey</Link></Button>
      )}
    </Card>
  )
}

export default Survey