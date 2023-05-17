import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from "./pages/Dashboard"
import Login from './pages/Login'
import Register from './pages/Register'
import CreateMovie from './pages/CreateMovie'
import Movie from './pages/Movie'

function App() {
  return (
    <>
    <Router>
    <div className="container">
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/createMovie' element={<CreateMovie/>}/>
        <Route path='/movies/:movieId' element={<Movie/>}/>
      </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App