import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Card from '../components/UI/Card'
import './css/Login.css'
import Button from '../components/UI/Button';
// import { Alert } from '@mui/material';


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
     }
    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Passwords do not match.')
        } else {
            const userData = {
                name, email, password
            }
            dispatch(register(userData))
        }
    }
    if(isLoading) {
        return <Spinner />
    }
    return (
        <>
        <div className='contentContainer'>
        <h2>Create a new account.</h2>

            <Card type="login">

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            value={password}
                            placeholder='Enter a password'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                    <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name='password2'
                            value={password2}
                            placeholder='Confirm password'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                    <Button variety="regular loginBtn">
                        Submit
                    </Button>
                    <a href="login">
                    <small>
                        <u>
                            Alredy have an account? Login.
                        </u>
                    </small>
                </a>
                    </div>
                </form>
            </section>
            </Card>
            </div>

        </>
    )
}

export default Register