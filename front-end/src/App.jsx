import {BrowserRouter, Routes , Route} from 'react-router-dom'
import { LoginPage} from './pages/LoginPage';
import { ErrorPage } from './pages/ErrorPage';
import { InstructionPage } from './pages/InstructionPage';
import { AdminPage } from './pages/AdminPage';
import {FeedbackPage } from './pages/FeedBackPage'; 
const App = ()=>{
  return <>
    <BrowserRouter>
      <Routes>
        <Route path = "/admin" element = {<AdminPage/>} />
        <Route path = "/instructions/:uid" element ={<InstructionPage/>} /> 
        <Route path = "/login" element ={<LoginPage/>} />
        <Route path = "/feedbackForm" element ={<FeedbackPage/>} />

        <Route path = "*" element = {<ErrorPage/>} />
      </Routes>
    </BrowserRouter>

    <div></div>
  </>
};

export default App