import { useParams, Link } from 'react-router-dom'
import { movies } from '../data/movies'
import './MovieDetailPage.css'

const MovieDetailPage = () => {
    const { id } = useParams()
    const movie = movies.find(m => m.id === parseInt(id)) || movies[0]

    return (
        <div className="movie-detail-page">
            {/* Hero Section */}
            <div
                className="movie-hero"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.8) 50%, rgba(26, 26, 46, 0.6) 100%), url(${movie.poster})`
                }}
            >
                <div className="container">
                    <div className="movie-hero-content">
                        <div className="movie-poster-large">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450/1a1a2e/dc3558?text=No+Poster'
                                }}
                            />
                            <span className="in-cinemas">In Cinemas</span>
                        </div>

                        <div className="movie-info-large">
                            <h1>{movie.title}</h1>

                            <div className="movie-rating-large">
                                <div className="rating-star">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <span className="rating-value">{movie.rating}/10</span>
                                </div>
                                <span className="rating-votes">{movie.votes} Votes</span>
                                <button className="rate-btn">Rate now</button>
                            </div>

                            <div className="movie-meta">
                                <span className="meta-item">{movie.formats?.join(', ')}</span>
                                <span className="meta-divider">•</span>
                                <span className="meta-item">{movie.languages?.join(', ')}</span>
                            </div>

                            <div className="movie-details">
                                <span className="detail-item">{movie.duration}</span>
                                <span className="detail-divider">•</span>
                                <span className="detail-item">{movie.genres?.join(', ')}</span>
                                <span className="detail-divider">•</span>
                                <span className="detail-item">{movie.certification}</span>
                                <span className="detail-divider">•</span>
                                <span className="detail-item">{movie.releaseDate}</span>
                            </div>

                            <Link to={`/movies/${movie.id}/theaters`} className="btn btn-primary btn-lg book-tickets-btn">
                                Book tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="container">
                <section className="movie-section">
                    <h2>About the movie</h2>
                    <p className="movie-synopsis">{movie.synopsis}</p>
                </section>

                {/* Cast Section */}
                {movie.cast && movie.cast.length > 0 && (
                    <section className="movie-section">
                        <h2>Cast</h2>
                        <div className="cast-grid">
                            {movie.cast.map((person, index) => (
                                <div key={index} className="cast-card">
                                    <div className="cast-image">
                                        {person.image ? (
                                            <img
                                                src={person.image}
                                                alt={person.name}
                                                onError={(e) => {
                                                    e.target.style.display = 'none'
                                                    e.target.nextSibling.style.display = 'flex'
                                                }}
                                            />
                                        ) : null}
                                        <div className="cast-placeholder" style={{ display: person.image ? 'none' : 'flex' }}>
                                            {person.name.charAt(0)}
                                        </div>
                                    </div>
                                    <h4>{person.name}</h4>
                                    <p>{person.role}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Crew Section */}
                <section className="movie-section">
                    <h2>Crew</h2>
                    <div className="crew-grid">
                        <div className="crew-item">
                            <p className="crew-role">Director</p>
                            <h4>{movie.director}</h4>
                        </div>
                        <div className="crew-item">
                            <p className="crew-role">Production</p>
                            <h4>{movie.producer}</h4>
                        </div>
                    </div>
                </section>

                {/* You Might Also Like */}
                <section className="movie-section">
                    <h2>You might also like</h2>
                    <div className="similar-movies">
                        {movies.filter(m => m.id !== movie.id).slice(0, 5).map(m => (
                            <Link key={m.id} to={`/movies/${m.id}`} className="similar-movie-card">
                                <img
                                    src={m.poster}
                                    alt={m.title}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150x225/1a1a2e/dc3558?text=Movie'
                                    }}
                                />
                                <h4>{m.title}</h4>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MovieDetailPage
