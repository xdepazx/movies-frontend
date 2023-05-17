import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Spinner from '../components/Spinner'
import { getMovies, reset } from "../features/movies/movieSlice"
import MovieItem from "../components/MovieItem"
import { toast } from 'react-toastify'

const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {movies, isLoading, isError, message} = useSelector((state) => state.movie)

  useEffect(() => {

    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/login')
    } else {
      dispatch(getMovies())
    }
    return () => {
      dispatch(reset())
    }
    

    //cuando se desmonte el componente, se resetee el state de las tareas
    return () =>  {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
          <h4>Welcome {user && user.name}</h4>
      </section>

      <section className="content">
        {movies.length > 0 ? ( 
          <div className="movies">
            {movies.map((movie)=> (
              <MovieItem key={movie._id} movie={movie} />
            ))}
          </div> 
        ) : (
            <p className="text-danger">Tu usuario no tiene ninguna pelicula en su lista</p>
        ) }
      </section>
    </>
  )
}

export default Dashboard