import {BrowserRouter, Routes , Route} from 'react-router-dom'
import { LoginPage} from './pages/LoginPage';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';


const App = ()=>{
  return <>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element ={<HomePage/>} /> 
        <Route path = "/login" element ={<LoginPage/>} />
        <Route path = "*" element = {<ErrorPage/>} />
      </Routes>
    </BrowserRouter>

    <div></div>
  </>
};

export default App