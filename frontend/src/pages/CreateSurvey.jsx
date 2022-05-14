import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Card from '../components/UI/Card'
import { useDispatch, useSelector } from 'react-redux'
import QuestionForm from '../components/forms/QuestionForm'
import Question from '../components/forms/Question'
import { createSurvey, deleteSurvey, getSurvey, reset, updateSurvey } from '../features/surveys/surveySlice'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuestionsBySurvey, deleteQuestion } from '../features/questions/questionSlice'
import { reset as resetQuestions } from '../features/questions/questionSlice'
import { FaCheck, FaRegEdit, FaTrash } from 'react-icons/fa'
import './css/CreateSurvey.css'
import { toast } from 'react-toastify'
import { FormControl, InputLabel, MenuItem, Select, StepLabel, Stepper, Step, StepButton, Typography, Box } from '@mui/material'

const CreateSurvey = () => {
  let id = useParams().id;
  /* Redux Slices */
  const { user } = useSelector((state) => state.auth)
  const { surveys } = useSelector((state) => state.surveys)
  const { questions } = useSelector((state) => state.questions)

  /* Form Data Stuff */
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
  const [formData, setFormData] = useState({
    survey: id ? id : "",
    // user: user._id,
    title: "",
    public: true,
    description: "",
    password: "",
    enableanon: true,
    color: surveyColor,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  /* Stepper stuff */
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return 3;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    if (isLastStep()) {
      navigate('/mysurveys/')
    }
    setCompleted(newCompleted);
    const newActiveStep =
      isLastStep() ? 2 : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleDelete = () => {
    dispatch(deleteSurvey(id))
    navigate('/mysurveys/')
  }

  useEffect(() => {
    if (id) {
      // setSubmittedDetails(true)
      dispatch(getQuestionsBySurvey(id))
      dispatch(getSurvey(id))
      setSurveyColor(surveys.color)
    }
    if (surveys) {

      // dispatch(reset())
      if (id) {
        dispatch(getSurvey(id))
      }
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
          public: surveys.public,
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

  const copyLink = () => {
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
    handleNext();

  }

  const RenderCurrentStep = () => {

    return (
      <div className='wizard'>
        <div className={`stepContainer firstStep ${activeStep === 0 && 'activeStep'}`}>
          <Card type="profile step">
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor="title">Survey Title</label>

                <input required placeholder={`${user.name}'s Epic Survey`} onChange={onChange} value={formData.title} type="text" id="title" name="title" />
              </div>
              <div className='form-group'>
                <label htmlFor="description">Survey Description</label>
                <textarea required placeholder='A survey with questions about epic things' style={{ resize: "none" }} value={formData.description} onChange={onChange} type="text" id="description" name="description" />
              </div>
              <div className='form-group' >
                <FormControl fullWidth>

                  <InputLabel for="public">Public or Private?</InputLabel>


                  <Select required onChange={onChange} value={formData.public} label="Public or Private?" name="public" id="public">
                    <MenuItem value={true}>Public</MenuItem>
                    <MenuItem value={false}>Private 🔒</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className='form-group'>
                <label for="title">Survey Color</label>
                <div className='form-group colors'>
                  {colors.map((color) => (
                    <div onClick={() => (handleColorChange(color))} className={`color ${surveyColor === color ? ("chosen") : ("")}`} style={{ background: color }}>
                      {surveyColor === color ? (
                        <div className='badge'>
                          <FaCheck />
                        </div>
                      ) : (<></>)}
                    </div>
                  ))}
                </div>
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />


                <Button onClick={onSubmit} disabled={formData.title === "" || formData.description === ""} variant="contained">
                  {activeStep === 2
                    ? 'Finish'
                    : 'Next'}
                </Button>

              </Box>
            </form>
          </Card>
        </div>
        <div className={`stepContainer secondStep ${activeStep === 1 && 'activeStep'} ${activeStep === 2 && 'thirdIsActive'}`}>
          <Card type="profile step">
            <QuestionForm />

            <Card type={`surveyForm question-list`}>

              {questions.length > 0 ? (

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

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />


              <Button onClick={onSubmit} disabled={formData.title === "" || formData.description === ""} variant="contained">
                {activeStep === 2
                  ? 'Finish'
                  : 'Next'}
              </Button>

            </Box>
          </Card>
        </div>

        <div className={`stepContainer thirdStep ${activeStep === 2 && 'activeStep'}`}>
          <Card type="profile step">
            <h3>{surveys.title}</h3>
            <h4>Copy the Link and Share!</h4>
            <div></div>
            <div onClick={copyLink} className='link'>{window.location.href.replace(/create\//g, '')}<span>🔗</span></div>
            <p>{questions.length} questions</p>
            <ol>

                  {questions.length > 0 ? (
                    <>
                    
              {questions.map((question) => (
                <li>
                  {question.text}
                </li>
              ))}
              </>
                  ) : (
                    <div>No questions</div>
                  )}
            </ol>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />


              <Button onClick={onSubmit} disabled={formData.title === "" || formData.description === ""} variant="contained">
                {activeStep === 2
                  ? 'Finish'
                  : 'Next'}
              </Button>

            </Box>
          </Card>
        </div>
      </div>
    )
  }


  return (
    <div style={{ backgroundColor: surveyColor, backgroundImage: `linear-gradient(${surveyColor},rgba(0, 0, 0, 0.5))` }} className='contentContainer'>
      <div className=''>
        {id ? (
          <h3>{surveys.title || formData.title} 📋</h3>
        ) : (
          <h3>New Survey 📋</h3>
        )}
      </div>
      <div style={{ height: '30px' }}>
        <Stepper nonLinear activeStep={activeStep}>

          <Step key="details" completed={completed[0]}>
            <StepLabel>Survey Details</StepLabel>
          </Step>

          <Step key="questions" completed={completed[1]}>
            <StepLabel>Add Questions</StepLabel>
          </Step>
          <Step completed={completed[2]}>
            <StepLabel>Review</StepLabel>
          </Step>
        </Stepper>
      </div>
      <>
        {RenderCurrentStep()}

      </>
      <>
      <Button onClick={handleDelete} variant="contained" color="error" size="small">Delete Survey</Button>


      </>
    </div>
  )
}

export default CreateSurvey