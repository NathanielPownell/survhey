import { useState } from 'react'
import { FaCheck, FaRegEdit, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteQuestion, updateQuestion } from '../../features/questions/questionSlice'
// import QuestionForm from './QuestionForm'
import './css/Question.css'

const Question = ({ question, id }) => {
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch()
    const [text, setText] = useState(question.text)

    const handleEditQuestion = async (question) => {
        if (editing) {

            dispatch(updateQuestion({
                id: question._id,
                survey: id,
                text: text,
                type: question.type,
                choices: question.choices
            }))
        }
        setEditing(!editing)

        // handleDeleteQuestion(question._id)

    }
    const handleDeleteQuestion = (qId) => {
        dispatch(deleteQuestion(qId))
    }
    const handleChange = (e) => {
        setText(e.target.value)
        console.log(text)
    }

    return (
        <div className='question-question-preview'>



            {editing ? (

                <textarea onChange={handleChange} className='question-edit' value={text} />
            ) : (
                <>
                    <p>
                        {text}
                    </p>
                </>
            )}

            <span>
                {editing ? (
                    <FaCheck cursor={"pointer"} color='#080' onClick={() => { handleEditQuestion(question) }} />
                ) : (
                    <FaRegEdit cursor={"pointer"} onClick={() => { handleEditQuestion(question) }} />
                )}
                <FaTrash className='pointer' color='#f00' onClick={() => { handleDeleteQuestion(question._id) }} />
            </span>

        </div>
    )
}

export default Question