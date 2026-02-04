import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { events } from '../data/events'
import './EventDetailPage.css'

const EventDetailPage = () => {
    const { id } = useParams()
    const event = events.find(e => e.id === parseInt(id)) || events[0]
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [showBooking, setShowBooking] = useState(false)

    const handleBook = () => {
        if (selectedTicket) {
            setShowBooking(true)
        }
    }

    return (
        <div className="event-detail-page">
            {/* Hero Banner */}
            <div
                className="event-hero"
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(26, 26, 46, 1) 0%, rgba(26, 26, 46, 0.5) 50%, transparent 100%), url(${event.image})`
                }}
            >
                <div className="container">
                    <div className="event-hero-content">
                        <span className="event-badge">{event.category}</span>
                        <h1>{event.title}</h1>
                        <div className="event-meta">
                            <div className="meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <span>{event.date}</span>
                            </div>
                            <div className="meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>{event.venue}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="event-content-grid">
                    {/* Main Content */}
                    <div className="event-main">
                        <section className="event-section">
                            <h2>About the Event</h2>
                            <p className="event-description">{event.description}</p>
                        </section>

                        {event.lineup && (
                            <section className="event-section">
                                <h2>Lineup</h2>
                                <div className="lineup-grid">
                                    {event.lineup.map((artist, index) => (
                                        <div key={index} className="lineup-item">
                                            <div className="lineup-avatar">
                                                {artist.charAt(0)}
                                            </div>
                                            <span>{artist}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="event-section">
                            <h2>Terms & Conditions</h2>
                            <ul className="terms-list">
                                <li>Entry is strictly by ticket only</li>
                                <li>Please carry a valid ID proof</li>
                                <li>No refunds on purchased tickets</li>
                                <li>Rights of admission reserved</li>
                                <li>Outside food and beverages not allowed</li>
                            </ul>
                        </section>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="event-sidebar">
                        <div className="booking-card">
                            <div className="booking-header">
                                <span className="price-from">Starting from</span>
                                <span className="price-main">{event.price}</span>
                            </div>

                            <div className="ticket-options">
                                <h4>Select Ticket Type</h4>
                                {event.ticketTypes?.map((ticket, index) => (
                                    <label
                                        key={index}
                                        className={`ticket-option ${selectedTicket?.name === ticket.name ? 'selected' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="ticket"
                                            checked={selectedTicket?.name === ticket.name}
                                            onChange={() => setSelectedTicket(ticket)}
                                        />
                                        <div className="ticket-info">
                                            <span className="ticket-name">{ticket.name}</span>
                                            <span className="ticket-price">₹{ticket.price}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {selectedTicket && (
                                <div className="quantity-selector">
                                    <h4>Number of Tickets</h4>
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                            disabled={quantity >= 10}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="booking-total">
                                <span>Total Amount</span>
                                <span className="total-price">
                                    ₹{selectedTicket ? selectedTicket.price * quantity : 0}
                                </span>
                            </div>

                            <button
                                className="btn btn-primary btn-lg btn-full book-btn"
                                onClick={handleBook}
                                disabled={!selectedTicket}
                            >
                                Book Now
                            </button>

                            {event.interested && (
                                <p className="interested-count">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    {event.interested} people are interested
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBooking && (
                <div className="modal-overlay" onClick={() => setShowBooking(false)}>
                    <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h2>Booking Confirmed!</h2>
                        <p>Your tickets for <strong>{event.title}</strong> have been booked.</p>

                        <div className="booking-details">
                            <div className="detail-row">
                                <span>Event</span>
                                <span>{event.title}</span>
                            </div>
                            <div className="detail-row">
                                <span>Date</span>
                                <span>{event.date}</span>
                            </div>
                            <div className="detail-row">
                                <span>Ticket Type</span>
                                <span>{selectedTicket?.name}</span>
                            </div>
                            <div className="detail-row">
                                <span>Quantity</span>
                                <span>{quantity}</span>
                            </div>
                            <div className="detail-row total">
                                <span>Total Amount</span>
                                <span>₹{selectedTicket?.price * quantity}</span>
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

export default EventDetailPage
