import { Link } from 'react-router-dom'
import './MovieCard.css'

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movies/${movie.id}`} className="movie-card">
            <div className="movie-poster">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x450/1a1a2e/dc3558?text=No+Poster'
                    }}
                />
                <div className="movie-rating">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span>{movie.rating}/10</span>
                    <span className="votes">{movie.votes} Votes</span>
                </div>
            </div>

            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-genres">{movie.genres?.join(', ')}</p>
            </div>
        </Link>
    )
}

export default MovieCard
