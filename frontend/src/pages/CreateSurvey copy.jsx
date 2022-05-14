import React, { useEffect, useState } from 'react'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import { useDispatch, useSelector } from 'react-redux'
import QuestionForm from '../components/forms/QuestionForm'
import Question from '../components/forms/Question'
import { createSurvey, deleteSurvey, getSurvey, reset, updateSurvey } from '../features/surveys/surveySlice'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuestionsBySurvey, deleteQuestion } from '../features/questions/questionSlice'
import { Link } from 'react-router-dom'
import { reset as resetQuestions } from '../features/questions/questionSlice'
import { FaCheck, FaRegEdit, FaTrash } from 'react-icons/fa'
import './css/CreateSurvey.css'
import { toast } from 'react-toastify'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const CreateSurvey = () => {
  const [submittedDetails, setSubmittedDetails] = useState(false)
  const [finished, setFinished] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { surveys } = useSelector((state) => state.surveys)
  const { questions } = useSelector((state) => state.questions)
  const [surveyColor, setSurveyColor] = useState("white")
  const colors = [
    "white",
    "#ff006e",
    "#ffdd00",
    "#36d709",
    "#00ffa0",
    "#00dcff",
    "#bd00ff"
  ]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let id = useParams().id;
  const [formData, setFormData] = useState({
    survey: id ? id : "",
    // user: user._id,
    title: "",
    public: "true",
    description: "",
    password: "",
    enableanon: true,
    color: surveyColor,
  })

  const handleDelete = () => {
    dispatch(deleteSurvey(id))
    navigate('/mysurveys/')
  }

  useEffect(() => {
    if (id) {
      setSubmittedDetails(true)
      dispatch(getQuestionsBySurvey(id))
      dispatch(getSurvey(id))
      setSurveyColor(surveys.color)
    }
    if (surveys) {
      dispatch(reset())
    }
    return () => {
      dispatch(resetQuestions())
    }
  }, [dispatch])


  useEffect(() => {
    if (id) {
      setSurveyColor(surveys.color)
      setFormData(
        {
          survey: id,
          title: surveys.title,
          public: surveys.isPublic,
          description: surveys.description,
          password: "",
          enableanon: surveys.enableanon,
          color: surveys.color,
        }
      )
    }
  }, [surveys])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleColorChange = async (color) => {
    setSurveyColor(color)
    setFormData((prevState) => ({
      ...prevState,
      color: color
    }))
  }
  useEffect(() => {
    if (surveys._id != null || surveys._id != undefined) {
      navigate(`/create/${surveys._id}`)
      id = surveys._id
    }
  }, [surveys._id])

  const copyLink = () =>{
    navigator.clipboard.writeText(window.location.href.replace(/create/g, 'survey'));
    toast.success('Link Copied!')
  }

  // Submit to Create/Update survey
  const onSubmit = async (e) => {
    e.preventDefault()
    setFormData((prevState) => ({
      ...prevState,
      color: surveyColor,
    }))
    if (id) {
      dispatch(updateSurvey(formData))
    } else {
      dispatch(createSurvey(formData))
      dispatch(getQuestionsBySurvey(id))
    }
    setSubmittedDetails(true)
  }

  if (finished) {
    return (
      <div style={{ backgroundColor: surveyColor, backgroundImage: `linear-gradient(${surveyColor},rgba(0, 0, 0, 0.5))` }} className='contentContainer'>
        <h3>Survey Review</h3>
        <Card type="profile">
          <h3>{surveys.title}</h3>
          <h4>Copy the Link and Share!</h4>
          <div>{window.location.href.replace(/create\//g, '')}</div>
          <div onClick={copyLink} className='link'>Copy<span>🔗</span></div>
          <p>{questions.length} questions</p>
          <ol>

            {questions.map((question) => (
              <li>
                {question.text}
              </li>
            ))}
          </ol>
          <div style={{display: "flex", gap: "20px", margin: "30px"}}>

            <Button onClick={() => {setFinished(false)}} variety="outlined">Edit</Button>
            <Button onClick={() => {navigate('/mysurveys')}} variety="regular">Done</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: surveyColor, backgroundImage: `linear-gradient(${surveyColor},rgba(0, 0, 0, 0.5))` }} className='contentContainer'>
      {id ? (
        <h3>{surveys.title} 📋</h3>
      ) : (
        <h3>New Survey 📋</h3>
      )}
      <section>
        <Card type={`surveyForm ${submittedDetails ? "finished" : ""}`}>

          <h3>Step 1: Survey Details</h3>
          {submittedDetails ? (
            <p>Finished!</p>
          ) : (
            <>
            </>
          )}


          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label for="title">Survey Title</label>
              {/* value={surveys.title ? surveys.title : formData.title} */}
              <input required placeholder={`${user.name}'s Epic Survey`} onChange={onChange} value={formData.title} type="text" id="title" name="title" />
            </div>
            <div className='form-group'>
              <label for="description">Survey Description</label>
              {/* value={surveys.description ? surveys.description : formData.description} */}
              <textarea required placeholder='A survey with questions about epic things' style={{ resize: "none" }} value={formData.description} onChange={onChange} type="text" id="description" name="description" />
            </div>
            {submittedDetails ? (
              <>

              </>

            ) : (
              <>
                <div className='form-group' >
                  <FormControl fullWidth>

                  <InputLabel for="public">Public or Private?</InputLabel>


                  <Select required onChange={onChange} value={formData.public} label="Public or Private?" name="public" id="public">
                    <MenuItem value={true}>Public</MenuItem>
                    <MenuItem value={false}>Private 🔒</MenuItem>
                  </Select>
                  </FormControl>
                </div>


              </>
            )}
            <div className='form-group'>
              <label for="title">Survey Color</label>
              <div className='form-group colors'>
                {colors.map((color) => (
                  <div onClick={() => (handleColorChange(color))} className={`color ${surveyColor == color ? ("chosen") : ("")}`} style={{ background: color }}>
                    {surveyColor === color ? (
                      <div className='badge'>
                        <FaCheck />
                      </div>
                    ) : (<></>)}
                  </div>
                ))}
              </div>
            </div>
            {submittedDetails ? (

              <Button type="submit" variety="outlined small">Update</Button>
            ) : (
              <Button type="submit" variety="regular "> Continue</Button>
            )}
          </form>

        </Card>
      </section>
      <section>
        <Card type={`surveyForm ${submittedDetails ? "" : "disabled"}`}>

          <h3>Step 2: Add Questions</h3>
          <QuestionForm />

        </Card>
      </section>

      <section>
        <Card type={`surveyForm ${submittedDetails ? "" : "disabled"}`}>

          {questions && questions.length > 0 ? (

            <>
              <h3><span>{questions.length}</span> Questions </h3>
              
              {questions.map((question) => (
                <>
                  <Question key={question._id} id={id} question={question} />
                </>
              ))}
            </>
          ) : (
            <h4>No questions! 🤷‍♂️</h4>
          )
          }

        </Card>

        <Card type={`surveyForm ${submittedDetails && questions.length > 1 ? "" : "disabled"}`}>
          <Button onClick={() => { setFinished(true) }} variety="regular maxwide">
            {/* <Link to={`/survey/${id}`}> */}
            Done ✔️
            {/* </Link> */}
          </Button>
        </Card>
        <Button onClick={handleDelete} variety="danger small">Delete Survey</Button>

      </section>
      <div className='container'>
        <br />
        <br />
      </div>
    </div>
  )
}

export default CreateSurvey