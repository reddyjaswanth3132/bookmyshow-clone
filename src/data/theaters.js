// Sample theaters and showtimes data
export const theaters = [
    {
        id: 1,
        name: "PVR INOX: Phoenix Palladium, Lower Parel",
        address: "Lower Parel, Mumbai",
        amenities: ["M-Ticket", "Food & Beverage", "Wheelchair Accessible"],
        isPremium: true,
        showtimes: [
            { time: "09:30 AM", format: "2D", price: 250, seats: 120 },
            { time: "12:45 PM", format: "IMAX 2D", price: 450, seats: 80 },
            { time: "04:00 PM", format: "2D", price: 300, seats: 120 },
            { time: "07:30 PM", format: "IMAX 2D", price: 550, seats: 20 },
            { time: "10:45 PM", format: "2D", price: 300, seats: 95 }
        ]
    },
    {
        id: 2,
        name: "INOX: Nakshatra Mall, Dadar",
        address: "Dadar West, Mumbai",
        amenities: ["M-Ticket", "Food & Beverage"],
        isPremium: false,
        showtimes: [
            { time: "10:00 AM", format: "2D", price: 200, seats: 150 },
            { time: "01:15 PM", format: "2D", price: 200, seats: 145 },
            { time: "04:30 PM", format: "2D", price: 250, seats: 110 },
            { time: "07:45 PM", format: "2D", price: 280, seats: 45 },
            { time: "11:00 PM", format: "2D", price: 250, seats: 130 }
        ]
    },
    {
        id: 3,
        name: "Cinépolis: Andheri West",
        address: "Fun Republic Mall, Andheri West, Mumbai",
        amenities: ["M-Ticket", "Food & Beverage", "Recliner", "4DX"],
        isPremium: true,
        showtimes: [
            { time: "09:00 AM", format: "4DX", price: 600, seats: 40 },
            { time: "12:30 PM", format: "2D", price: 280, seats: 100 },
            { time: "03:45 PM", format: "4DX", price: 650, seats: 35 },
            { time: "07:00 PM", format: "2D", price: 320, seats: 60 },
            { time: "10:15 PM", format: "2D", price: 300, seats: 85 }
        ]
    },
    {
        id: 4,
        name: "PVR: Juhu",
        address: "Juhu, Mumbai",
        amenities: ["M-Ticket", "Food & Beverage", "Wheelchair Accessible"],
        isPremium: false,
        showtimes: [
            { time: "11:00 AM", format: "2D", price: 220, seats: 130 },
            { time: "02:15 PM", format: "2D", price: 220, seats: 125 },
            { time: "05:30 PM", format: "2D", price: 260, seats: 90 },
            { time: "08:45 PM", format: "2D", price: 280, seats: 55 }
        ]
    },
    {
        id: 5,
        name: "INOX: R-City Mall, Ghatkopar",
        address: "Ghatkopar West, Mumbai",
        amenities: ["M-Ticket", "Food & Beverage", "IMAX", "Dolby Atmos"],
        isPremium: true,
        showtimes: [
            { time: "09:15 AM", format: "IMAX 2D", price: 400, seats: 75 },
            { time: "12:30 PM", format: "2D", price: 240, seats: 110 },
            { time: "03:45 PM", format: "IMAX 2D", price: 480, seats: 50 },
            { time: "07:00 PM", format: "2D", price: 280, seats: 70 },
            { time: "10:15 PM", format: "IMAX 2D", price: 450, seats: 65 }
        ]
    },
    {
        id: 6,
        name: "PVR INOX: Infinity Mall, Malad",
        address: "Malad West, Mumbai",
        amenities: ["M-Ticket", "Food & Beverage"],
        isPremium: false,
        showtimes: [
            { time: "10:30 AM", format: "2D", price: 200, seats: 140 },
            { time: "01:45 PM", format: "2D", price: 200, seats: 135 },
            { time: "05:00 PM", format: "2D", price: 240, seats: 100 },
            { time: "08:15 PM", format: "2D", price: 260, seats: 65 },
            { time: "11:30 PM", format: "2D", price: 220, seats: 115 }
        ]
    }
]

// Seat layout configuration
export const seatLayout = {
    categories: [
        {
            name: "RECLINER",
            price: 700,
            color: "#8B5CF6",
            rows: [
                { label: "A", seats: 8, type: "recliner" },
                { label: "B", seats: 8, type: "recliner" }
            ]
        },
        {
            name: "GOLD",
            price: 450,
            color: "#F59E0B",
            rows: [
                { label: "C", seats: 14, type: "regular" },
                { label: "D", seats: 14, type: "regular" },
                { label: "E", seats: 14, type: "regular" },
                { label: "F", seats: 14, type: "regular" }
            ]
        },
        {
            name: "SILVER",
            price: 280,
            color: "#6B7280",
            rows: [
                { label: "G", seats: 16, type: "regular" },
                { label: "H", seats: 16, type: "regular" },
                { label: "I", seats: 16, type: "regular" },
                { label: "J", seats: 16, type: "regular" },
                { label: "K", seats: 16, type: "regular" }
            ]
        }
    ],
    // Pre-booked seats (row-seatNumber format)
    bookedSeats: [
        "A-3", "A-4", "B-5", "B-6",
        "C-7", "C-8", "C-9", "D-5", "D-6", "D-7",
        "E-10", "E-11", "F-3", "F-4",
        "G-8", "G-9", "G-10", "H-12", "H-13",
        "I-1", "I-2", "J-15", "J-16", "K-7", "K-8", "K-9"
    ]
}

// Get theaters for a movie
export const getTheatersForMovie = (movieId, city) => {
    // In real app, this would filter by movie and city
    return theaters
}

// Get available dates (next 7 days)
export const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    for (let i = 0; i < 7; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        dates.push({
            day: days[date.getDay()],
            date: date.getDate(),
            month: months[date.getMonth()],
            full: date.toISOString().split('T')[0]
        })
    }

    return dates
}

export default theaters
