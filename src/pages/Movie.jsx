import { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getMovie, reset } from '../features/movie/moviesSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


const Movie = () => {
    const URL_IMAGE = 'https://image.tmdb.org/t/p/w500'
    /* const {id} = useParams()
    const {movieData} = useParams() */
    const params = useParams()
    const movie_id = params.movieId
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { movies, isLoading, isError, message } = useSelector((state) => state.movies)

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        dispatch(getMovie(movie_id))
        

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    
  return (
    <>

        <div className="container mb-4">
           <div className="row">
            <div className="col">
                <img className="" src={ URL_IMAGE + movies.poster_path } alt={movies.title} />
            </div>
            <div className="col">
            <div className="text-start"><h2>{movies.title}</h2></div>
            <p className="lead fw-normal mb-4 text-start mt-3">{movies.overview}</p>
        
        
       
            <div className="">
                <a className="mt-4 btn btn-info" href="/">Back to my movies</a>
            </div>
            </div>
            </div>
        </div>

    </>
  )
}

export default Movie