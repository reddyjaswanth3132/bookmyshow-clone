import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

const Header = ({ city, onLocationClick, onSignInClick }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()

    const navLinks = [
        { label: 'Movies', path: '/movies' },
        { label: 'Stream', path: '/stream' },
        { label: 'Events', path: '/events' },
        { label: 'Plays', path: '/plays' },
        { label: 'Sports', path: '/sports' },
        { label: 'Activities', path: '/activities' },
    ]

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <Link to="/" className="logo">
                        <svg viewBox="0 0 75 14" className="logo-svg">
                            <text x="0" y="12" fill="#dc3558" fontWeight="bold" fontSize="12">book</text>
                            <text x="28" y="12" fill="#fff" fontWeight="bold" fontSize="12">my</text>
                            <text x="44" y="12" fill="#dc3558" fontWeight="bold" fontSize="12">show</text>
                        </svg>
                    </Link>

                    <form className="search-bar" onSubmit={handleSearch}>
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                <div className="header-right">
                    <button className="location-btn" onClick={onLocationClick}>
                        <span className="city-name">{city}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>

                    <button className="signin-btn" onClick={onSignInClick}>
                        Sign in
                    </button>

                    <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>

            <nav className="nav-bar">
                <div className="nav-container">
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} className="nav-link">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="nav-right">
                        <Link to="/list-your-show" className="nav-action">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            List Your Show
                        </Link>
                        <Link to="/corporates" className="nav-action">Corporates</Link>
                        <Link to="/offers" className="nav-action">Offers</Link>
                        <Link to="/gift-cards" className="nav-action">Gift Cards</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
