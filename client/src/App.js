import './App.css';
import './temp.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import UserLogInPage from './Pages/UserLogInPage';
import UserSignUpPage from './Pages/UserSignUpPage';
import UserPage from './Pages/UserPage';
import PostNewPage from './Pages/PostNewPage';
import JobDetailsPage from './Pages/JobDetailsPage'
import ProfLogInPage from './Pages/ProfLogInPage';
import ProfSignUpPage from './Pages/ProfSignUpPage';
import ProfessionalPage from './Pages/ProfessionalPage';
import ProfJobDetailsPage from './Pages/ProfJobDetailsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<HomePage />}/>
          <Route path='/about' element={<AboutPage />}/>
          <Route path='/contact' element={<ContactPage />}/>
          <Route path='/userlogin' element={<UserLogInPage />}/>
          <Route path='/usersignup' element={<UserSignUpPage />}/>
          <Route path='/user' element={<UserPage />}/>
          <Route path='/postjob' element={<PostNewPage />}/>
          <Route path="/user/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/prof/jobs/:id" element={<ProfJobDetailsPage />} />
          <Route path="/proflogin" element={<ProfLogInPage />} />
          <Route path="/profsignup" element={<ProfSignUpPage />} />
          <Route path="/prof" element={<ProfessionalPage />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
