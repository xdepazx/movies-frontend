import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createMovie, reset} from '../features/movies/movieSlice'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'

const MovieForm = () => {
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [vote_count, setVote_count] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {movie, isLoading, isError, isSucces, message} = useSelector((state)=> state.movie)
    
    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if (isSucces) {
            navigate('/')
            toast("Movie added to your list")
        }  

        dispatch(reset())

    }, [movie, isError, isSucces, message, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

            //data del movieSlice
            const movieData = {
                title, 
                overview, 
                poster_path, 
                vote_count
            }
            //dispatchar el userdata para q esa funcion sea pasada al movieService
            dispatch(createMovie(movieData))
    }

    if (isLoading) {
        return <Spinner/>
    }

  return (
    
    <section className="form">
        <h4>Add a movie to your list</h4>
        <form onSubmit={onSubmit}>
        <div className="form-group">
            <label className="col-form-label mt-4" htmlFor="title">Movie</label>
            <input 
            type="text" 
            className="form-control" 
            placeholder="Title" 
            id="title" 
            name="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="form-group">
            <label className="col-form-label mt-4" htmlFor="overview">Overview</label>
            <textarea 
            type="text" 
            className="form-control" 
            placeholder="This movie is about..." 
            id="overview" 
            name="overview" 
            value={overview} 
            onChange={(e) => setOverview(e.target.value)}/>
        </div>
        <div className="form-group">
            <label className="col-form-label mt-4" htmlFor="poster_path">Image</label>
            <input 
            type="text" 
            className="form-control" 
            placeholder="Upload an image" 
            id="poster_path" 
            name="poster_path" 
            value={poster_path} 
            onChange={(e) => setPoster_path(e.target.value)}/>
        </div>
        <div className="form-group">
            <label className="col-form-label mt-4" htmlFor="vote_count">Votes</label>
            <input 
            type="text" 
            className="form-control" 
            placeholder="Votes" 
            id="vote_count" 
            name="vote_count" 
            value={vote_count} 
            onChange={(e) => setVote_count(e.target.value)}/>
        </div>

            {/* <div className="form-group">
                <label htmlFor="title">Movie:</label>
                <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div> */}
            <div className="form-group">
                <button type="submit" className='btn btn-primary'>Create movie</button>
            </div>
        </form>
    </section>
  )
}

export default MovieForm