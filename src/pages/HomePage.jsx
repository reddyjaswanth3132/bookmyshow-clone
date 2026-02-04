import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import EventCard from '../components/EventCard'
import { movies, getRecommendedMovies } from '../data/movies'
import { events, eventCategories } from '../data/events'
import './HomePage.css'

const heroSlides = [
    {
        id: 1,
        image: "",
        title: "Pushpa 2: The Rule",
        subtitle: "The Wait Is Over"
    },
    {
        id: 2,
        image: "",
        title: "Coldplay Live In India",
        subtitle: "Music Of The Spheres World Tour"
    },
    {
        id: 3,
        image: "",
        title: "Sunburn Festival 2024",
        subtitle: "Asia's Biggest EDM Festival"
    }
]

const HomePage = ({ city }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [recommendedMovies, setRecommendedMovies] = useState([])
    const carouselRef = useRef(null)

    useEffect(() => {
        setRecommendedMovies(getRecommendedMovies(city))
    }, [city])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const scrollCarousel = (direction, ref) => {
        if (ref.current) {
            const scrollAmount = 280
            ref.current.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="home-page">
            {/* Hero Carousel */}
            <section className="hero-carousel">
                <div className="hero-slides">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="hero-overlay">
                                <div className="hero-content">
                                    <h1>{slide.title}</h1>
                                    <p>{slide.subtitle}</p>
                                    <Link to="/movies/1" className="btn btn-primary btn-lg">
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hero-dots">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
                <button
                    className="hero-arrow hero-arrow-left"
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <button
                    className="hero-arrow hero-arrow-right"
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </section>

            {/* Recommended Movies */}
            <section className="section movies-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Recommended Movies</h2>
                        <Link to="/movies" className="see-all">See All →</Link>
                    </div>

                    <div className="carousel-wrapper">
                        <button
                            className="carousel-arrow carousel-arrow-left"
                            onClick={() => scrollCarousel(-1, carouselRef)}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className="movies-carousel" ref={carouselRef}>
                            {recommendedMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        <button
                            className="carousel-arrow carousel-arrow-right"
                            onClick={() => scrollCarousel(1, carouselRef)}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Live Events Categories */}
            <section className="section events-categories-section">
                <div className="container">
                    <h2 className="section-title">The Best of Live Events</h2>

                    <div className="event-categories-grid">
                        {eventCategories.map((category) => (
                            <Link
                                key={category.name}
                                to={`/events?category=${category.name}`}
                                className="event-category-card"
                                style={{ '--category-color': category.color }}
                            >
                                <span className="category-icon">{category.icon}</span>
                                <span className="category-name">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="section events-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Trending Events</h2>
                        <Link to="/events" className="see-all">See All →</Link>
                    </div>

                    <div className="events-grid">
                        {events.slice(0, 4).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Premieres Section */}
            <section className="section premieres-section">
                <div className="premieres-bg">
                    <div className="container">
                        <div className="section-header">
                            <div>
                                <span className="premieres-label">PREMIERES</span>
                                <h2 className="section-title white">Brand new releases every Friday</h2>
                            </div>
                        </div>

                        <div className="movies-carousel premieres-carousel">
                            {movies.slice(0, 5).map((movie) => (
                                <div key={movie.id} className="premiere-card">
                                    <Link to={`/movies/${movie.id}`}>
                                        <div className="premiere-poster">
                                            <img
                                                src={movie.poster}
                                                alt={movie.title}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/300x450/1a1a2e/dc3558?text=Premiere'
                                                }}
                                            />
                                            <span className="premiere-badge">PREMIERE</span>
                                        </div>
                                        <h3>{movie.title}</h3>
                                        <p>{movie.languages?.[0]}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* App Download Banner */}
            <section className="section app-banner-section">
                <div className="container">
                    <div className="app-banner">
                        <div className="app-banner-content">
                            <h2>Download the BookMyShow App</h2>
                            <p>Get instant access to movie tickets, events, and exclusive offers</p>
                            <div className="app-buttons">
                                <a href="#" className="app-store-btn">
                                    <img src="https://in.bmscdn.com/webin/common/icons/playstore.svg" alt="Google Play" />
                                </a>
                                <a href="#" className="app-store-btn">
                                    <img src="https://in.bmscdn.com/webin/common/icons/appstore.svg" alt="App Store" />
                                </a>
                            </div>
                        </div>
                        <div className="app-banner-image">
                            <svg viewBox="0 0 200 400" fill="none">
                                <rect x="10" y="10" width="180" height="380" rx="25" fill="#1a1a2e" stroke="#dc3558" strokeWidth="3" />
                                <rect x="60" y="20" width="80" height="8" rx="4" fill="#333" />
                                <rect x="25" y="50" width="150" height="280" rx="5" fill="#2b2d42" />
                                <text x="100" y="200" fill="#dc3558" fontSize="40" fontWeight="bold" textAnchor="middle">BMS</text>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage
