// Sample events data for BookMyShow clone
export const events = [
    {
        id: 1,
        title: "Sunburn Festival 2024",
        image: "https://media.insider.in/image/upload/c_crop,g_custom/v1732178093/zcdxdynupuwevekd6epz.jpg",
        category: "Music",
        date: "Dec 28-29, 2024",
        venue: "Vagator, Goa",
        price: "₹4,500 onwards",
        interested: "12.5K",
        description: "Asia's biggest electronic dance music festival featuring world-renowned DJs and artists.",
        lineup: ["Martin Garrix", "Tiësto", "Hardwell", "Alan Walker"],
        ticketTypes: [
            { name: "General Access", price: 4500 },
            { name: "VIP Access", price: 8500 },
            { name: "VVIP Backstage", price: 15000 }
        ]
    },
    {
        id: 2,
        title: "Arijit Singh Live in Concert",
        image: "https://media.insider.in/image/upload/c_crop,g_custom/v1730719025/qcutrjsmqsj87j3yommu.jpg",
        category: "Music",
        date: "Jan 15, 2025",
        venue: "MMRDA Grounds, Mumbai",
        price: "₹1,999 onwards",
        interested: "45.2K",
        description: "Experience the magic of Arijit Singh's soulful voice in an unforgettable live concert.",
        ticketTypes: [
            { name: "Silver", price: 1999 },
            { name: "Gold", price: 4999 },
            { name: "Platinum", price: 9999 },
            { name: "Diamond", price: 14999 }
        ]
    },
    {
        id: 3,
        title: "Stand Up Comedy Night",
        image: "https://media.insider.in/image/upload/c_crop,g_custom/v1729859169/lnqqe5rpclklmxd4ysmw.jpg",
        category: "Comedy",
        date: "Every Saturday",
        venue: "Canvas Laugh Club, Mumbai",
        price: "₹499 onwards",
        interested: "3.2K",
        description: "Join us for a night of laughs featuring the best stand-up comedians in the country.",
        ticketTypes: [
            { name: "Standard", price: 499 },
            { name: "Premium", price: 799 }
        ]
    },
    {
        id: 4,
        title: "IPL 2025 - Mumbai vs Chennai",
        image: "https://media.insider.in/image/upload/c_crop,g_custom/v1679646289/jvz2jx1z4c8iuoyulphs.jpg",
        category: "Sports",
        date: "Apr 5, 2025",
        venue: "Wankhede Stadium, Mumbai",
        price: "₹800 onwards",
        interested: "89.5K",
        description: "The biggest rivalry in IPL! Watch Mumbai Indians take on Chennai Super Kings.",
        ticketTypes: [
            { name: "East Stand", price: 800 },
            { name: "West Stand", price: 1200 },
            { name: "North Stand", price: 2500 },
            { name: "VIP Box", price: 15000 }
        ]
    },
    {
        id: 5,
        title: "Zakir Khan Live",
        image: "https://media.insider.in/image/upload/c_crop,g_custom/v1699960467/lxhepqnpyttwf4clhixe.jpg",
        category: "Comedy",
        date: "Jan 20, 2025",
        venue: "Nehru Centre, Mumbai",
        price: "₹699 onwards",
        interested: "8.7K",
        description: "Experience Zakir Khan's iconic storytelling and humor in this must-attend stand-up show.",
        ticketTypes: [
            { name: "Balcony", price: 699 },
            { name: "Stalls", price: 999 },
            { name: "Front Row", price: 1499 }
        ]
    },
    {
        id: 6,
        title: "Coldplay Music of the Spheres",
        image: "https://media.insider.in/image/upload/c_crop,g_custom/v1729164679/xmwrlojzqzjlhgkfehk8.jpg",
        category: "Music",
        date: "Jan 18-19, 2025",
        venue: "DY Patil Stadium, Mumbai",
        price: "₹2,500 onwards",
        interested: "156.3K",
        description: "Coldplay's spectacular Music of the Spheres World Tour comes to India!",
        ticketTypes: [
            { name: "Standing", price: 2500 },
            { name: "Seated", price: 6500 },
            { name: "Lounge", price: 12500 },
            { name: "Infinity", price: 35000 }
        ]
    },
    {
        id: 7,
        title: "Art Workshop: Mandala Painting",
        image: "https://media.insider.in/image/upload/c_crop,g_custom/v1648446547/xbxbdmxhc4rsnxqp6civ.jpg",
        category: "Workshops",
        date: "Every Sunday",
        venue: "Art Café, Bandra",
        price: "₹1,200",
        interested: "450",
        description: "Learn the meditative art of mandala painting in this beginner-friendly workshop.",
        ticketTypes: [
            { name: "Workshop Entry", price: 1200 }
        ]
    },
    {
        id: 8,
        title: "Mumbai Food Festival 2025",
        image: "https://media.insider.in/image/upload/c_crop,g_custom/v1705479647/d9nh4uwxqr9dj4wj5k6n.jpg",
        category: "Experiences",
        date: "Feb 14-16, 2025",
        venue: "BKC, Mumbai",
        price: "₹350 onwards",
        interested: "23.1K",
        description: "The biggest food festival of the year featuring 200+ vendors, live cooking shows, and celebrity chefs.",
        ticketTypes: [
            { name: "Single Day Pass", price: 350 },
            { name: "Weekend Pass", price: 899 },
            { name: "All Access VIP", price: 2499 }
        ]
    }
]

// Get events by category
export const getEventsByCategory = (category) => {
    if (!category || category === 'All') return events
    return events.filter(e => e.category === category)
}

// Get featured events
export const getFeaturedEvents = () => {
    return events.filter(e => e.interested && parseInt(e.interested.replace('K', '000')) > 10000)
}

export const eventCategories = [
    { name: "Music", icon: "🎵", color: "#8B5CF6" },
    { name: "Comedy", icon: "😂", color: "#F59E0B" },
    { name: "Sports", icon: "⚽", color: "#10B981" },
    { name: "Workshops", icon: "🎨", color: "#EC4899" },
    { name: "Experiences", icon: "✨", color: "#3B82F6" },
    { name: "Theatre", icon: "🎭", color: "#EF4444" },
    { name: "Kids", icon: "👶", color: "#06B6D4" },
]

export default events
