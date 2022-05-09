import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import Header from './components/Header';

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import MySurveys from './pages/MySurveys'
import CreateSurvey from './pages/CreateSurvey';
import PublicSurveys from './pages/PublicSurveys'
import MyResponses from './pages/MyResponses'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile';
import TakeSurvey from './pages/TakeSurvey';
import EditSurvey from './pages/EditSurvey';
import User from './pages/User';
import Splash from './pages/Splash';
import Feedback from './pages/Feedback';
import {theme} from './themes/theme'
import { ThemeProvider } from '@emotion/react';


function App() {
  return (
    <>
    <Router>
    <ThemeProvider theme={theme}>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Splash />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/mysurveys' element={<MySurveys />}></Route>
          <Route path='/create' element={<CreateSurvey />}></Route>
          <Route path='/create/:id' element={<CreateSurvey />}></Route>
          <Route path='/edit/:id' element={<CreateSurvey />}></Route>
          <Route path='/surveys' element={<PublicSurveys />}></Route>
          {/* <Route path='/myresponses' element={<MyResponses />}></Route> */}
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/user/:id' element={<User />}></Route>
          <Route path='/survey/:id' element={<TakeSurvey />}></Route>
          <Route path='/feedback/:id' element={<Feedback />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
      </ThemeProvider>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
