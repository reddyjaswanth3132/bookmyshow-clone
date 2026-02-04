import { useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { movies } from '../data/movies'
import './MoviesPage.css'

const languages = ['All', 'Hindi', 'English', 'Telugu', 'Tamil', 'Malayalam', 'Kannada']
const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Thriller', 'Romance', 'Sci-Fi', 'Animation']
const formats = ['All', '2D', '3D', 'IMAX', '4DX']

const MoviesPage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('All')
    const [selectedGenre, setSelectedGenre] = useState('All')
    const [selectedFormat, setSelectedFormat] = useState('All')
    const [sortBy, setSortBy] = useState('popularity')

    const filteredMovies = movies.filter(movie => {
        const languageMatch = selectedLanguage === 'All' || movie.languages?.includes(selectedLanguage)
        const genreMatch = selectedGenre === 'All' || movie.genres?.includes(selectedGenre)
        const formatMatch = selectedFormat === 'All' || movie.formats?.includes(selectedFormat)
        return languageMatch && genreMatch && formatMatch
    })

    const sortedMovies = [...filteredMovies].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'release') return new Date(b.releaseDate) - new Date(a.releaseDate)
        return 0 // popularity - keep original order
    })

    return (
        <div className="movies-page">
            <div className="container">
                <div className="page-header">
                    <h1>Movies in Mumbai</h1>
                    <p className="breadcrumb">
                        <Link to="/">Home</Link> / Movies
                    </p>
                </div>

                {/* Filters */}
                <div className="filters-section">
                    <div className="filter-group">
                        <label>Language</label>
                        <div className="filter-chips">
                            {languages.map(lang => (
                                <button
                                    key={lang}
                                    className={`filter-chip ${selectedLanguage === lang ? 'active' : ''}`}
                                    onClick={() => setSelectedLanguage(lang)}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Genre</label>
                        <div className="filter-chips">
                            {genres.map(genre => (
                                <button
                                    key={genre}
                                    className={`filter-chip ${selectedGenre === genre ? 'active' : ''}`}
                                    onClick={() => setSelectedGenre(genre)}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Format</label>
                        <div className="filter-chips">
                            {formats.map(format => (
                                <button
                                    key={format}
                                    className={`filter-chip ${selectedFormat === format ? 'active' : ''}`}
                                    onClick={() => setSelectedFormat(format)}
                                >
                                    {format}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sort & Results */}
                <div className="results-header">
                    <span className="results-count">{sortedMovies.length} movies found</span>
                    <div className="sort-dropdown">
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="popularity">Popularity</option>
                            <option value="rating">Rating</option>
                            <option value="release">Release Date</option>
                        </select>
                    </div>
                </div>

                {/* Movies Grid */}
                <div className="movies-grid">
                    {sortedMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {sortedMovies.length === 0 && (
                    <div className="no-results">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <h3>No movies found</h3>
                        <p>Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MoviesPage
