import { useState } from 'react'
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import surveyImg from '../assets/survhey.png'
import './css/Header.css'
import Button from './UI/Button'
import Hamburger from '../components/UI/Hamburger'
import { Avatar } from '@mui/material'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [open, setOpen] = useState()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        setOpen(!open)
        navigate('/')
    }

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>
                    <img src={surveyImg} alt="survhey logo" />
                </Link>
            </div>
            <ul className='desktop'>
                {user ? (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                {user.img ?
                                    <Avatar alt={user.name} src={user.img} />
                                    :
                                    <p>Profile</p>
                                }
                                {/* <img className='profile-image-img-small' src={user.img} /> */}
                            </Link>
                        </li>
                        <li>
                            <Button variety='round outlined small' onClick={onLogout}>
                                <FaSignOutAlt /> &nbsp; Logout
                            </Button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <Button variety='outlined'>
                                    <FaSignInAlt /> &nbsp; Login
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <Button variety='regular'>
                                    <FaUserPlus /> &nbsp; Register
                                </Button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            <div className='mobile'>

                <Hamburger open={open} handleClick={handleClick} />
            </div>
            <div className={`mobile mobile-nav ${open ? 'opened' : ''}`}>
            <ul className='mobile-nav-items'>
                {user ? (
                    <>
                        
                        <li>
                            <Link onClick={handleClick} to="/profile">
                                {user.img ?
                                    <div className="profile-image-img profile-image-img-small" style={{ background: `url(${user.img ? user.img : null})`, backgroundSize: "cover" }} />
                                    :
                                    <p>Profile</p>
                                }
                                {/* <img className='profile-image-img-small' src={user.img} /> */}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleClick} to="/dashboard">Dashboard</Link>
                        </li>
                        <li >
                            <Button variety='round outlined small' onClick={onLogout}>
                                <FaSignOutAlt /> &nbsp; Logout
                            </Button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link onClick={handleClick} to='/login'>
                                <Button variety='outlined'>
                                    <FaSignInAlt /> &nbsp; Login
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleClick} to='/register'>
                                <Button variety='regular'>
                                    <FaUserPlus /> &nbsp; Register
                                </Button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            </div>
        </header>
    )
}

export default Header