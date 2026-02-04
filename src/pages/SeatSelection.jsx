import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { movies } from '../data/movies'
import { theaters, seatLayout } from '../data/theaters'
import './SeatSelection.css'

const SeatSelection = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const movie = movies.find(m => m.id === parseInt(id)) || movies[0]

    const theaterId = searchParams.get('theater')
    const time = searchParams.get('time')
    const format = searchParams.get('format')
    const basePrice = parseInt(searchParams.get('price')) || 280

    const theater = theaters.find(t => t.id === parseInt(theaterId)) || theaters[0]

    const [selectedSeats, setSelectedSeats] = useState([])
    const [showConfirmation, setShowConfirmation] = useState(false)

    const isSeatBooked = (row, seatNum) => {
        return seatLayout.bookedSeats.includes(`${row}-${seatNum}`)
    }

    const toggleSeat = (row, seatNum, category) => {
        const seatId = `${row}-${seatNum}`
        if (isSeatBooked(row, seatNum)) return

        if (selectedSeats.find(s => s.id === seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s.id !== seatId))
        } else {
            if (selectedSeats.length >= 10) {
                alert('Maximum 10 seats can be selected')
                return
            }
            setSelectedSeats([...selectedSeats, {
                id: seatId,
                row,
                seatNum,
                category: category.name,
                price: category.price
            }])
        }
    }

    const getTotalPrice = () => {
        return selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
    }

    const getSeatsByCategory = () => {
        const grouped = {}
        selectedSeats.forEach(seat => {
            if (!grouped[seat.category]) {
                grouped[seat.category] = { seats: [], price: seat.price }
            }
            grouped[seat.category].seats.push(seat.id)
        })
        return grouped
    }

    return (
        <div className="seat-selection-page">
            {/* Header */}
            <div className="seat-header">
                <div className="container">
                    <div className="seat-header-content">
                        <div>
                            <h1>{movie.title}</h1>
                            <p>{theater.name} | {time} | {format}</p>
                        </div>
                        <Link to={`/movies/${movie.id}/theaters`} className="change-btn">
                            Change
                        </Link>
                    </div>
                </div>
            </div>

            {/* Seat Legend */}
            <div className="seat-legend">
                <div className="container">
                    <div className="legend-items">
                        <div className="legend-item">
                            <span className="seat-demo available"></span>
                            <span>Available</span>
                        </div>
                        <div className="legend-item">
                            <span className="seat-demo selected"></span>
                            <span>Selected</span>
                        </div>
                        <div className="legend-item">
                            <span className="seat-demo booked"></span>
                            <span>Sold</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seat Map */}
            <div className="seat-map-container">
                <div className="container">
                    <div className="screen">
                        <div className="screen-curve"></div>
                        <span>All eyes this way please!</span>
                    </div>

                    <div className="seat-categories">
                        {seatLayout.categories.map((category) => (
                            <div key={category.name} className="seat-category">
                                <div className="category-header">
                                    <span className="category-name">{category.name}</span>
                                    <span className="category-price">₹{category.price}</span>
                                </div>

                                <div className="seat-rows">
                                    {category.rows.map((row) => (
                                        <div key={row.label} className="seat-row">
                                            <span className="row-label">{row.label}</span>
                                            <div className="seats">
                                                {Array.from({ length: row.seats }, (_, i) => {
                                                    const seatNum = i + 1
                                                    const seatId = `${row.label}-${seatNum}`
                                                    const isBooked = isSeatBooked(row.label, seatNum)
                                                    const isSelected = selectedSeats.find(s => s.id === seatId)

                                                    // Add gap in the middle for aisle
                                                    const hasGap = i === Math.floor(row.seats / 2) - 1

                                                    return (
                                                        <button
                                                            key={seatNum}
                                                            className={`seat ${row.type} ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                                                            style={{
                                                                '--seat-color': category.color,
                                                                marginRight: hasGap ? '20px' : undefined
                                                            }}
                                                            onClick={() => toggleSeat(row.label, seatNum, category)}
                                                            disabled={isBooked}
                                                            title={`${row.label}${seatNum}`}
                                                        >
                                                            <span>{seatNum}</span>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                            <span className="row-label">{row.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Booking Summary */}
            {selectedSeats.length > 0 && (
                <div className="booking-summary">
                    <div className="container">
                        <div className="summary-content">
                            <div className="selected-seats-info">
                                <div className="seats-count">
                                    <span className="count">{selectedSeats.length}</span>
                                    <span>Tickets</span>
                                </div>
                                <div className="seats-list">
                                    {Object.entries(getSeatsByCategory()).map(([category, data]) => (
                                        <div key={category} className="category-seats">
                                            <span className="category-label">{category}:</span>
                                            <span className="seat-numbers">{data.seats.join(', ')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="summary-action">
                                <div className="total-price">
                                    <span className="price-label">Total</span>
                                    <span className="price-value">₹{getTotalPrice()}</span>
                                </div>
                                <button
                                    className="btn btn-primary btn-lg proceed-btn"
                                    onClick={() => setShowConfirmation(true)}
                                >
                                    Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
                    <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h2>Booking Confirmed!</h2>
                        <p>Your tickets for <strong>{movie.title}</strong> have been booked.</p>

                        <div className="booking-details">
                            <div className="detail-row">
                                <span>Theater</span>
                                <span>{theater.name}</span>
                            </div>
                            <div className="detail-row">
                                <span>Time</span>
                                <span>{time}</span>
                            </div>
                            <div className="detail-row">
                                <span>Seats</span>
                                <span>{selectedSeats.map(s => s.id).join(', ')}</span>
                            </div>
                            <div className="detail-row total">
                                <span>Total Amount</span>
                                <span>₹{getTotalPrice()}</span>
                            </div>
                        </div>

                        <p className="demo-note">This is a demo application. No actual booking has been made.</p>

                        <div className="modal-actions">
                            <Link to="/" className="btn btn-primary">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SeatSelection
