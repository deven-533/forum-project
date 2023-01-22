import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage';
import TagPage from './pages/TagPage';
import UserPage from './pages/UserPage';
import Profile from './components/Profile';
import QuestionMap from './components/QuestionMap';
import Signup from './components/Signup';
import Login from './components/Login';
import Ask from './components/Ask';



function App() {
  return (
    <>
      <div>
        <Toaster
          position='top-center'
          toastOptions={
            {
              success: {
                theme: {
                  primary: 'green',
                }
              }
            }
          }
        >
        </Toaster>
      </div>

      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/tags" element={<TagPage/>}></Route>
          <Route exact path="/users" element={<UserPage/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/register" element={<Signup/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/question/:id" element={<QuestionMap/>}></Route>
          <Route path="/ask" element={<Ask/>}></Route>
          

        </Routes>
      </Router>
    </>
    
  );
}

export default App;
