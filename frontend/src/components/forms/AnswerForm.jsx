import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../UI/Button'
import './css/AnswerForm.css'
import { participate } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'

const AnswerForm = (props) => {
  const navigate = useNavigate()
  const question = props.questions[props.index]
  const dispatch = useDispatch()

  const finish = () => { 
    dispatch(participate())
    props.setFinished(true)
    
  }

  const handleChange = (e) => {
    props.setAnswer(e.target.value)
    console.log(props.answer)
  }

  useEffect(() => {
    console.log(question)
  })
  return (
    <>
      {question &&
        <form onSubmit={props.handleSubmit}>
          <h5>{props.index + 1} of {props.questions.length}</h5>
          <h4>{question.text}</h4>
          <div className='answer-form-group'>
            <Input handleChange={handleChange} question={question} type={question.type} />
          </div>
          <Button type="submit" variety="regular small">Submit</Button>
        </form>
      }
      {props.index >= props.questions.length &&
        <Button onClick={finish} variety="regular maxwide">
          Finish
        </Button>

      }
    </>
  )
}


/* Different types of input based on question type */

const Input = (props) => {
  switch (props.type) {
    case 0:
      return (
        <>
          <div className='radio-input'>
            <input required onChange={props.handleChange} type="radio" id="yes" value={"yes"} name="radio" />
            <label htmlFor='yes'>Yes</label>
          </div>
          <div className='radio-input'>
            <input onChange={props.handleChange} type="radio" id="no" value={"no"} name="radio" />
            <label htmlFor='no'>No</label>
          </div>
        </>
      )
    case 1:
      return (
        <>
          {props.question.choices.map((choice) => (
            <div className='radio-input'>
              <input onChange={props.handleChange} required type="radio" id={choice} name="radio" value={choice} />
              <label htmlFor={choice}>{choice}</label>
            </div>
          ))}
        </>
      )
    case 2:
      return (
        <>
          <div className='radio-input'>
            <input required onChange={props.handleChange} type="radio" id="true" value="true" name="radio" />
            <label htmlFor='true'>True</label>
          </div>
          <div className='radio-input'>
            <input onChange={props.handleChange} type="radio" id="false" value="false" name="radio" />
            <label htmlFor='false'>False</label>
          </div>
        </>
      )
    case 3:
      return (
        <>
          <textarea onChange={props.handleChange}  className="form-textarea" required type="text" placeholder='Type here...' />
        </>
      )
  }

}



export default AnswerForm