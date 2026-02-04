import { useState } from 'react'
import './LocationModal.css'

const popularCities = [
    { name: 'Mumbai', icon: '🏙️' },
    { name: 'Delhi-NCR', icon: '🏛️' },
    { name: 'Bengaluru', icon: '💻' },
    { name: 'Hyderabad', icon: '🏰' },
    { name: 'Ahmedabad', icon: '🛕' },
    { name: 'Chandigarh', icon: '🌳' },
    { name: 'Chennai', icon: '🏖️' },
    { name: 'Pune', icon: '🎓' },
    { name: 'Kolkata', icon: '🌉' },
    { name: 'Kochi', icon: '🌴' },
]

const allCities = [
    'Agra', 'Allahabad', 'Amritsar', 'Aurangabad', 'Bhopal', 'Bhubaneswar',
    'Coimbatore', 'Dehradun', 'Goa', 'Gurgaon', 'Guwahati', 'Indore',
    'Jaipur', 'Jammu', 'Jodhpur', 'Kanpur', 'Lucknow', 'Ludhiana',
    'Mangalore', 'Mysore', 'Nagpur', 'Nashik', 'Noida', 'Patna',
    'Raipur', 'Rajkot', 'Ranchi', 'Surat', 'Thiruvananthapuram', 'Vadodara',
    'Varanasi', 'Vijayawada', 'Visakhapatnam'
]

const LocationModal = ({ onClose, onSelect, selectedCity }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCities = allCities.filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleCityClick = (city) => {
        onSelect(city)
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="location-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="location-search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for your city"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                </div>

                {!searchQuery && (
                    <>
                        <div className="detect-location">
                            <button className="detect-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
                                </svg>
                                Detect my location
                            </button>
                        </div>

                        <div className="popular-cities">
                            <h3>Popular Cities</h3>
                            <div className="cities-grid">
                                {popularCities.map((city) => (
                                    <button
                                        key={city.name}
                                        className={`city-btn ${selectedCity === city.name ? 'active' : ''}`}
                                        onClick={() => handleCityClick(city.name)}
                                    >
                                        <span className="city-icon">{city.icon}</span>
                                        <span className="city-name">{city.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <div className="other-cities">
                    <h3>{searchQuery ? 'Search Results' : 'Other Cities'}</h3>
                    <div className="cities-list">
                        {filteredCities.map((city) => (
                            <button
                                key={city}
                                className={`city-list-btn ${selectedCity === city ? 'active' : ''}`}
                                onClick={() => handleCityClick(city)}
                            >
                                {city}
                            </button>
                        ))}
                        {searchQuery && filteredCities.length === 0 && (
                            <p className="no-results">No cities found matching "{searchQuery}"</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationModal
