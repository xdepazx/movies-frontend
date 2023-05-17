import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { borrarMovies, likeMovie } from '../features/movies/movieSlice'
import { FaHeart, FaPlayCircle, FaRegThumbsUp, FaThumbsUp, FaTimesCircle } from 'react-icons/fa'

const MovieItem = ({ movie }) => {
    const URL_IMAGE= 'https://image.tmdb.org/t/p/w500'
    const dispatch = useDispatch()

    return (
        
            <div className="card text-white bg-secondary mb-3" style={{maxWidth: '20rem'}}>
                <div className="card-header">
                    <button className='btn btn-dark rounded-2 close' onClick={() => dispatch(borrarMovies(movie._id))}>
                        X
                    </button>
                </div>
                
                <img src={URL_IMAGE + movie.poster_path} alt="" className="card-img-top" />
        
                <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text text-start">
                    {movie.overview.substr(0,50) + "..." } <br />
                </p>
                
                </div>
                <button><div className="">Likes: {movie.vote_count}</div></button>
                <button className="btn btn-primary mb-2" onClick={()=> dispatch(likeMovie(movie._id))}>
                <FaThumbsUp/> Like
                </button>
                <button className="btn btn-success">
                    <Link className="nav-link" to={ '/movies/' + movie._id }> <FaPlayCircle/> Play </Link>
                </button>
            </div>
       

        /* <div className='movie'>
            <div>
                {new Date(movie.createdAt).toLocaleString('es-MX')}
                <h4>{movie.title}</h4>
                <button className='close' onClick={() => dispatch(borrarMovies(movie._id))}>
                    X
                </button>
            </div>
        </div> */
    )
}

export default MovieItem