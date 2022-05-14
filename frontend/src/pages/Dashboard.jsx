import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMySurveys, reset } from '../features/surveys/surveySlice'
import Spinner from '../components/Spinner'
import Card from '../components/UI/Card'
import floatingGraphic from '../assets/floatingGraphic.png'
import { FaPlus } from 'react-icons/fa'
import Cookies from '../components/Cookies'



const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { surveys, isLoading, isError, message } = useSelector((state) => state.surveys)

  useEffect(() => {
    if (isError) {
    }
    if (!user) {
      navigate('/login')
    }
    return () => {
      dispatch(reset)
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      {/* <GoalForm /> */}
      <Cookies />
      <section className='contentContainer'>
        <section className='heading'>
          <h3>Welcome, {user && user.name}</h3>
        </section>
        <div className="cardContainerDash">


          <Card type="dashCard" onClick={()=>{navigate('/mysurveys')}}>
            <h3>My Surveys</h3>
            <p>Manage surveys and feedback.</p>
          </Card>
          <Card type="dashCard addCard" onClick={()=>{navigate('/create')}}>
            <h3>New Survey</h3>
            <FaPlus style={{ fontSize: "40px" }} />
          </Card>
          <Card onClick={()=>{navigate('/surveys')}} type="dashCard purple">
            <div>
              <h3>Public Surveys</h3>
              <p>Participate in community surveys.</p>
              <Link to="/"><u><b style={{ color: "#fff" }}>Let's Go.</b></u></Link>
            </div>
            <img style={{ width: "200px" }} src={floatingGraphic} />
          </Card>
          {/* <Card onClick={()=>{navigate('/myresponses')}} type="dashCard grey">
            <h3>My Responses</h3>
            <p>View survey feedback you've provided and view/delete responses.</p>
          </Card> */}
        </div>
      </section>
    </>
  )
}

export default Dashboard