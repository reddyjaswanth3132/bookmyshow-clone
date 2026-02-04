import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MovieDetailPage from './pages/MovieDetailPage'
import TheaterSelection from './pages/TheaterSelection'
import SeatSelection from './pages/SeatSelection'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import LocationModal from './components/LocationModal'
import SignInModal from './components/SignInModal'
import './App.css'

function App() {
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [selectedCity, setSelectedCity] = useState('Mumbai')

  const handleCitySelect = (city) => {
    setSelectedCity(city)
    setShowLocationModal(false)
  }

  return (
    <Router>
      <div className="app">
        <Header 
          city={selectedCity}
          onLocationClick={() => setShowLocationModal(true)}
          onSignInClick={() => setShowSignInModal(true)}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage city={selectedCity} />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="/movies/:id/theaters" element={<TheaterSelection />} />
            <Route path="/movies/:id/seats" element={<SeatSelection />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
          </Routes>
        </main>
        <Footer />
        
        {showLocationModal && (
          <LocationModal 
            onClose={() => setShowLocationModal(false)}
            onSelect={handleCitySelect}
            selectedCity={selectedCity}
          />
        )}
        
        {showSignInModal && (
          <SignInModal onClose={() => setShowSignInModal(false)} />
        )}
      </div>
    </Router>
  )
}

export default App
