import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import './css/Login.css'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/dashboard')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])


    const { email, password } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }

        dispatch(login(userData))
        // redirect('/')
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="contentContainer">
                <h2>Log in to your account.</h2>
                <Card type="login">

                    <div className='loginSection'>
                        <section className='login_form'>
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
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
                                        placeholder='Enter your password'
                                        onChange={onChange} />
                                </div>

                                <div className="form-group">
                                    <Button variety="regular loginBtn">
                                        Log In
                                    </Button>
                                    <a href="register">
                                        <small>
                                            <u>
                                                Don't have an account? Register.
                                            </u>
                                        </small>
                                    </a>
                                </div>
                            </form>
                        </section>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Login