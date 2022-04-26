import React, { useState, useEffect } from 'react';
import Button from './UI/Button';
import { useTransition, animated, config } from 'react-spring'
import cookiesImg from '../assets/cookies.png'
import './Cookies.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/auth/authSlice';


const Cookies = () => {
    const { user } = useSelector((state) => state.auth)
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()


    useEffect(() => {
        if(user) {
            setShow(!user.acceptedCookies)
        }
    }, [])

    const handleClick = () => {
        setShow(!show)
        dispatch(updateUser({acceptedCookes: true}))
    }

    const transitions = useTransition(show, {
        from: { transform: "translateY(100%)" },
        enter: { transform: "translateY(0)" },
        delay: 2000,
        config: config.molasses,
    })

    return transitions(
        (styles, item) => item &&
            <animated.div style={styles} className='cookies'>
                <img src={cookiesImg} />
                <h3>Want Some Cookies?</h3>
                <p>We use cookies and similar
                    technologies to provide a better experience

                </p>
                <Button onClick={handleClick} variety="regular uppercase maxwide">
                    Accept Cookies
                </Button>
                {/* <Button variety="outlined maxwide">
                    Decline Cookies
                </Button>
                <a href="#">Cookie Policy</a> */}
            </animated.div>
    )
};

export default Cookies;

