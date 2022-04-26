import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMySurveys, reset } from '../features/surveys/surveySlice'
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


const MySurveys = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { surveys, isLoading, isError, message } = useSelector((state) => state.surveys)

  const springApi = useSpringRef()

  const transApi = useSpringRef()
  const transition = useTransition(surveys, {
    ref: transApi,
    trail: 2000 / surveys.length,
    from: { opacity: 0, transform: "translateX(-120px)", scale: 0.999 },
    enter: { opacity: 1, transform: "translateX(0)", scale: 1 },
    // leave: { opacity: 0, scale: 0 },
  })

  useChain([springApi, transApi], [
    0,
    0.6,
  ])



  return (
    <animated.section className='contentContainer'>

      {surveys.length > 0 ? (
        <div className="surveys">
          {transition((style, survey) => (
            <animated.div style={{ ...style }}>
              <Survey survey={survey} />
            </animated.div>
          ))}
        </div>
      ) : (<p>🕸️ You have no surveys. <Link to="/create">Make One!</Link></p>)
      }
    </animated.section>
  )
}

export default MySurveys