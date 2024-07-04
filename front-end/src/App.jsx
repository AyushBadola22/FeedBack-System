import {BrowserRouter, Routes , Route} from 'react-router-dom'
import { LoginPage} from './pages/LoginPage';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';


const App = ()=>{
  return <>
    <BrowserRouter>
      <Routes>
        <Route path = "/create/admin" element = {<AdminPage/>} />
        <Route path = "/home" element ={<HomePage/>} /> 
        <Route path = "/login" element ={<LoginPage/>} />
        <Route path = "*" element = {<ErrorPage/>} />
      </Routes>
    </BrowserRouter>

    <div></div>
  </>
};

export default App