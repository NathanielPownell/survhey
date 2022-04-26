import { useState, useEffect } from 'react'
import Card from '../UI/Card'
import Button from '../UI/Button'
import { FaPlus, FaListUl, FaPlusCircle, FaTrash, FaTimes, FaEdit, FaRegEdit } from 'react-icons/fa'
import { createQuestion, getQuestionsBySurvey, reset } from '../../features/questions/questionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

const QuestionForm = (props) => {
    const { surveys } = useSelector((state) => state.surveys)
    const { questions, isError, isSuccess, isLoading, message } = useSelector((state) => state.questions)
    const [options, setOptions] = useState([])
    const id = useParams().id
    const [formData, setFormData] = useState({
        survey: id,
        text: "",
        type: 0,
        choices: [],
    })
    const [option, setOption] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        // if (isSuccess) {
        //     toast.success(message)
        // }

        // dispatch(reset())
    }, [isError, isSuccess, message, dispatch, options])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(options)

        formData.survey = id

        setFormData({
            survey: formData.survey,
            text: formData.text,
            type: formData.type,
            choices: options,
        })
        console.log(formData)
        setOptions([])
        dispatch(createQuestion({...formData, choices: options}))
        setFormData({
            survey: id,
            text: "",
            type: 0,
            choices: [],
        })
        dispatch(getQuestionsBySurvey(formData.survey))


    }
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        if (e.target.name === "type" && e.target.value !== "1") {
            setOptions("")
        }
        console.log(e.target.value)
    }
    const handleChangeOption = (e) => {
        setOption(e.target.value)


        console.log(option)
    }

    const handleAddOption = async () => {
        setOptions([...options, option])

        setFormData((prevFormState) => ({
            ...prevFormState,
            choices: options,
        }))
        setOption("")
        console.log(options)
    }

    const handleRemove = async (option, prevState) => {
        let prevOptions = prevState
        prevOptions.pop(option)
        setOptions(prevOptions)
        setFormData((prevFormState) => ({
            ...prevFormState,
            choices: options,
        }))
        console.log(options)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label for="text">Question Text</label>
                <input required placeholder={`Do you like pizza? `} onChange={onChange} value={formData.text} type="text" id="text" name="text" />
            </div>
            <div className='form-group' >
                <label>Question Type</label>
                <select required onChange={onChange} value={formData.type} name="type" id="type">
                    <option value="0">Yes/No</option>
                    <option value="2">True/False</option>
                    <option value="1">Multiple Choice </option>
                    <option value="3">Text Feedback</option>
                    {/* <option value="4">Private</option>
                    <option value="5">Private</option>
                    <option value="6">Private</option> */}
                </select>

            </div>
            {formData && formData.type === "1" ? (
                <div className='form-group' >
                    <label for="choice-input">Question Choices</label>
                    <div style={{ display: "flex", alignItems: "center" }}>

                        <input style={{ margin: 0 }} placeholder={`Multiple Choice Option...`} onChange={handleChangeOption} value={option} type="text" id="choice-input" name="choice-input" />
                        <Button onClick={() => { handleAddOption(options) }} type="button" variety="small regular maxheight "><FaPlusCircle /></Button>
                    </div>
                    {options &&
                        <div>
                            {options.map((item, id) => (
                                <Card type="option" key={id}>{item}<FaTimes cursor={"pointer"} color='#f00' onClick={(id) => { handleRemove(id, options) }} /> </Card>
                            ))}
                        </div>
                    }
                </div>
            ) : (
                <p></p>
            )}

            <Button type="submit" variety="small outlined">Add Question &nbsp; <FaPlus /> </Button>
        </form>
    )
}

export default QuestionForm