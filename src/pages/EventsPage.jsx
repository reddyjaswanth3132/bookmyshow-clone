import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import EventCard from '../components/EventCard'
import { events, eventCategories } from '../data/events'
import './EventsPage.css'

const EventsPage = () => {
    const [searchParams] = useSearchParams()
    const initialCategory = searchParams.get('category') || 'All'
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)

    const filteredEvents = selectedCategory === 'All'
        ? events
        : events.filter(e => e.category === selectedCategory)

    return (
        <div className="events-page">
            <div className="container">
                <div className="page-header">
                    <h1>Events in Mumbai</h1>
                    <p className="breadcrumb">
                        <Link to="/">Home</Link> / Events
                    </p>
                </div>

                {/* Category Filter */}
                <div className="category-filter">
                    <button
                        className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('All')}
                    >
                        All Events
                    </button>
                    {eventCategories.map(cat => (
                        <button
                            key={cat.name}
                            className={`category-btn ${selectedCategory === cat.name ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.name)}
                            style={{ '--cat-color': cat.color }}
                        >
                            <span className="cat-icon">{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Featured Banner */}
                {selectedCategory === 'All' && (
                    <div className="featured-banner">
                        <div className="featured-content">
                            <span className="featured-label">FEATURED</span>
                            <h2>Coldplay: Music of the Spheres</h2>
                            <p>The most awaited concert of the year - Jan 18-19, 2025</p>
                            <Link to="/events/6" className="btn btn-primary">
                                Get Tickets
                            </Link>
                        </div>
                    </div>
                )}

                {/* Events Grid */}
                <div className="events-grid-page">
                    {filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="no-results">
                        <h3>No events found in {selectedCategory}</h3>
                        <p>Check back soon for upcoming events!</p>
                    </div>
                )}

                {/* Newsletter Section */}
                <div className="newsletter-section">
                    <div className="newsletter-content">
                        <h3>Never miss an event!</h3>
                        <p>Subscribe to get notified about the latest events in your city</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsPage
