import { Link } from 'react-router-dom'
import './EventCard.css'

const EventCard = ({ event }) => {
    return (
        <Link to={`/events/${event.id}`} className="event-card">
            <div className="event-image">
                <img
                    src={event.image}
                    alt={event.title}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x250/1a1a2e/dc3558?text=Event'
                    }}
                />
                <span className="event-category">{event.category}</span>
            </div>

            <div className="event-info">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p className="event-venue">{event.venue}</p>
                <p className="event-price">{event.price}</p>
                {event.interested && (
                    <p className="event-interested">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {event.interested} interested
                    </p>
                )}
            </div>
        </Link>
    )
}

export default EventCard
