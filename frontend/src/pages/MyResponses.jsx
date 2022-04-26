import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyAnswers } from '../features/answers/answerSlice'


const MyResponses = () => {
  const { answers, isLoading, isError, message } = useSelector((state) => state.answers)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyAnswers())
  }, [])

  return (
    <div className='contentContainer'>

    <h3>My Responses</h3>
    {answers &&
      <ul>
      {answers.map((answer) => (
        <li>{answer.body}</li>
      ))}
      </ul>
    }
    </div>
  )
}

export default MyResponses