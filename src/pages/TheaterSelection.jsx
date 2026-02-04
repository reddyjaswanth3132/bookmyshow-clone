import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { movies } from '../data/movies'
import { theaters, getAvailableDates } from '../data/theaters'
import './TheaterSelection.css'

const TheaterSelection = () => {
    const { id } = useParams()
    const movie = movies.find(m => m.id === parseInt(id)) || movies[0]
    const dates = getAvailableDates()

    const [selectedDate, setSelectedDate] = useState(dates[0])
    const [selectedFormat, setSelectedFormat] = useState(movie.formats?.[0] || '2D')

    return (
        <div className="theater-selection-page">
            <div className="container">
                {/* Movie Header */}
                <div className="movie-header-bar">
                    <div className="movie-header-left">
                        <h1>{movie.title}</h1>
                        <div className="movie-tags">
                            <span className="tag certification">{movie.certification}</span>
                            {movie.languages?.slice(0, 3).map(lang => (
                                <span key={lang} className="tag language">{lang}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Date Selector */}
                <div className="date-selector">
                    {dates.map((date, index) => (
                        <button
                            key={date.full}
                            className={`date-btn ${selectedDate.full === date.full ? 'active' : ''}`}
                            onClick={() => setSelectedDate(date)}
                        >
                            <span className="date-day">{date.day}</span>
                            <span className="date-num">{date.date}</span>
                            <span className="date-month">{date.month}</span>
                        </button>
                    ))}
                </div>

                {/* Format Filter */}
                <div className="format-filter">
                    <span className="filter-label">Format:</span>
                    {movie.formats?.map(format => (
                        <button
                            key={format}
                            className={`format-btn ${selectedFormat === format ? 'active' : ''}`}
                            onClick={() => setSelectedFormat(format)}
                        >
                            {format}
                        </button>
                    ))}
                </div>

                {/* Theaters List */}
                <div className="theaters-list">
                    {theaters.map(theater => {
                        const filteredShowtimes = theater.showtimes.filter(st =>
                            selectedFormat === 'All' || st.format === selectedFormat || st.format.includes(selectedFormat)
                        )

                        if (filteredShowtimes.length === 0) return null

                        return (
                            <div key={theater.id} className="theater-card">
                                <div className="theater-info">
                                    <div className="theater-main">
                                        <div className="theater-icon">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="theater-name">{theater.name}</h3>
                                            <p className="theater-address">{theater.address}</p>
                                        </div>
                                    </div>
                                    <div className="theater-amenities">
                                        {theater.amenities.map(amenity => (
                                            <span key={amenity} className="amenity-tag">{amenity}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="showtimes">
                                    {filteredShowtimes.map((showtime, index) => (
                                        <Link
                                            key={index}
                                            to={`/movies/${movie.id}/seats?theater=${theater.id}&time=${showtime.time}&format=${showtime.format}&price=${showtime.price}`}
                                            className={`showtime-btn ${showtime.seats < 50 ? 'filling-fast' : ''}`}
                                        >
                                            <span className="showtime-time">{showtime.time}</span>
                                            <span className="showtime-format">{showtime.format}</span>
                                            {showtime.seats < 50 && (
                                                <span className="seats-left">{showtime.seats} seats left</span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Legend */}
                <div className="showtime-legend">
                    <div className="legend-item">
                        <span className="legend-color available"></span>
                        <span>Available</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color filling-fast"></span>
                        <span>Filling Fast</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheaterSelection
