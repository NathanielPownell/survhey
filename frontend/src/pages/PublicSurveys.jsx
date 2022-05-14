import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSurveys, reset } from '../features/surveys/surveySlice'
import Spinner from '../components/Spinner'
import Survey from '../components/Survey'
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef
} from '@react-spring/web'


import { FaList, FaEyeSlash, FaTh } from 'react-icons/fa'
import './css/PublicSurveys.css'
const PublicSurveys = () => {
  // const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [grid, setGrid] = useState(false)
  const [hidePersonal, setHidePersonal] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { surveys, isLoading, isError, message } = useSelector((state) => state.surveys)
  const springApi = useSpringRef()

  const transApi = useSpringRef()
  const transition = useTransition(surveys, {
    ref: transApi,
    trail: 2000 / surveys.length,
    from: { opacity: 0, transform: "translateX(-500px)", scale: .8},
    enter: { opacity: 1, transform: "translateX(0)", scale: 1},
    // leave: { opacity: 0, scale: 0 },
  })

  useChain([springApi, transApi], [
    0,
    0.6,
  ])
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getAllSurveys())
    return () => {
      dispatch(reset())
    }
  }, [user, hidePersonal, navigate, grid, isError, message, dispatch])

  const toggleSelected = () => {
    setGrid(!grid)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='surveys-container'>
        <div className='view-actions'>
          <div onClick={toggleSelected} className={`view-option ${!grid ? 'selected' : ''}`}>
            <FaList />
          </div>
          <div onClick={toggleSelected} className={`view-option ${grid ? 'selected' : ''}`}>
            <FaTh />
          </div>
          {/* <div onClick={()=>{setHidePersonal(!hidePersonal)}} className={`view-option hide-btn ${hidePersonal ? 'selected' : ''}`}>
            <span>Hide My Surveys</span> <FaEyeSlash />
          </div> */}
        </div>
      <section>

        {surveys.length > 0 ? (
          <div className={`surveys ${grid ? 'surveys-grid' : 'surveys-list'}`}>
            {transition((style, survey) => (
              <animated.div style={{ ...style }}>
                <Survey survey={survey} hidePersonal={hidePersonal} />
              </animated.div>
            ))}
          </div>
        ) : (<p>No surveys to display. <Link to="/create">Make One!</Link></p>)
        }
      </section>
    </ div>
  )
}

export default PublicSurveys