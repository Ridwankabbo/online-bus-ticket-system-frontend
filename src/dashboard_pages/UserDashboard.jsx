import React, { useState, useMemo, useEffect } from 'react';
import { LogOut, User, History, ArrowLeft, X, Search, MapPin, Calendar, Clock } from 'lucide-react';

// --- MOCK DATA ---

// Mock User Data (Now a standard customer)
// const MOCK_USER = {
//     id: 'customer-101',
//     name: 'Rohan Ahmed',
//     role: 'Valued Customer',
//     email: 'rohan.ahmed@example.com',
//     phone: '+880 1712 345678',
//     lastLogin: '2024-10-27 10:30 AM',
//     systemStatus: 'Active',
// };

// Mock Bookings Data (Filtered to show only user Rohan Ahmed's bookings for realism)
// const MOCK_BOOKINGS = [
//     { id: 'B001', date: '2024-10-26', route: 'Dhaka to Cox\'s Bazar', user: 'Rohan Ahmed', status: 'Confirmed', seats: ['A1', 'A2'], total: 2500, departure: '08:00 AM' },
//     { id: 'B006', date: '2024-10-25', route: 'Dhaka to Bogura', user: 'Rohan Ahmed', status: 'Cancelled', seats: ['E5'], total: 950, departure: '09:00 AM' },
//     { id: 'B007', date: '2024-10-27', route: 'Sylhet to Dhaka', user: 'Rohan Ahmed', status: 'Confirmed', seats: ['F1', 'F2', 'F3'], total: 3600, departure: '07:30 PM' },
//     { id: 'B008', date: '2024-10-28', route: 'Khulna to Jessore', user: 'Rohan Ahmed', status: 'Pending', seats: ['C1'], total: 550, departure: '01:00 PM' },
// ];

// Utility function for status coloring
const getStatusClasses = (status) => {
    switch (status) {
        case 'Confirmed':
            return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
        case 'Cancelled':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'Pending':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

// --- COMPONENTS ---

/**
 * 1. User Profile View
 */
const ProfileView = ({ user }) => (
    <div className="bg-whit p-8 rounded-xl shadow-2xl space-y-6 max-w-xl mx-auto border border-violet-200 dark:border-violet-700">
        <div className="flex items-center space-x-4 border-b pb-4 border-violet-100 dark:border-violet-700">
            <div className="p-3 bg-violet-100 dark:bg-violet-900 rounded-full">
                <User className="w-8 h-8 text-violet-600 dark:text-violet-300" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-gray-900">{user.user?.username}</h2>
                {/* <p className="text-violet-600 dark:text-violet-400 font-medium">{user.role}</p> */}
            </div>
        </div>

        <div className="space-y-4">
            {/* <ProfileField label="Account ID" value={user.id} /> */}
            <ProfileField label="Email Address" value={user.user?.email} />
            <ProfileField label="Phone Number" value={user.phone} />
            <ProfileField label="User Address" value={user.address}/>
            {/* <ProfileField label="Last Login" value={user.lastLogin} />
            <ProfileField label="Account Status" value={user.systemStatus} isBadge /> */}
        </div>

        <button className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-[1.01]">
            Update Contact Information
        </button>
    </div>
);

const ProfileField = ({ label, value, isBadge = false }) => (
    
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
        <span className="text-gray-500 dark:text-gray-400 font-medium">{label}</span>
        {isBadge ? (
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {value}
            </span>
        ) : (
            <span className="text-gray-800 dark:text-gray-200 font-semibold">{value}</span>
        )}
    </div>
);

/**
 * 2. Bookings History List View
 */
const HistoryView = ({ bookings, onSelectBooking, searchTerm, onSearchChange }) => {
    
    // Sort bookings by date descending
    const sortedBookings = useMemo(() => {
        return [...bookings].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [bookings]);

    // Filter bookings based on search term (case-insensitive search on user or route)
    // const filteredBookings = sortedBookings.filter(booking => 
    //     booking.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    return (
        <div className="space-y-6">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search your bookings by Route or Booking ID..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-violet-500 focus:border-violet-500 transition duration-150 shadow-md"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 dark:text-gray-300" />
            </div>

            <div className="overflow-hidden rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 dark:bg-gray-800 font-bold uppercase text-xs tracking-wider text-gray-500 dark:text-gray-400">
                        <div className="col-span-3">ID / Status</div>
                        <div className="col-span-4">Route</div>
                        <div className="col-span-3 hidden sm:block">Departure Time</div>
                        <div className="col-span-2 text-right">Total Paid</div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings > 0 ?  bookings.map((booking) => (
                        <BookingListItem key={booking.id} booking={booking} onClick={() => onSelectBooking(booking)} />
                    )) : (
                        <p className="p-6 text-center text-gray-500 dark:text-gray-400">No bookings found matching your search criteria.</p>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

const BookingListItem = ({ booking, onClick }) => (
    <div
        onClick={onClick}
        className="grid grid-cols-12 px-6 py-4 hover:bg-violet-50 dark:hover:bg-gray-700 transition duration-150 cursor-pointer items-center"
    >
        <div className="col-span-3">
            <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">{booking.id}</p>
            <span className={`inline-flex mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusClasses(booking.status)}`}>
                {booking.status}
            </span>
        </div>
        <div className="col-span-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{booking.route}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Seats: {booking.seats.join(', ')}</p>
        </div>
        <div className="col-span-3 hidden sm:block text-sm text-gray-600 dark:text-gray-300">
            {booking.date} @ {booking.departure}
        </div>
        <div className="col-span-2 text-sm font-bold text-right text-gray-800 dark:text-gray-100">
            BDT {booking.total.toLocaleString()}
        </div>
    </div>
);

/**
 * 3. Booking Detail Modal
 */
const BookingDetailModal = ({ booking, onClose }) => {
    if (!booking) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-3xl w-full max-w-lg transform transition-all overflow-hidden border border-violet-500 dark:border-violet-400">
                
                {/* Modal Header */}
                <div className="p-5 flex justify-between items-center bg-violet-600 dark:bg-violet-800 text-white">
                    <h3 className="text-xl font-bold flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Ticket: {booking.id}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-violet-700 dark:hover:bg-violet-900 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4 text-gray-800 dark:text-gray-200">
                    
                    <DetailItem icon={MapPin} label="Route" value={booking.route} />
                    <DetailItem icon={Calendar} label="Date" value={booking.date} />
                    <DetailItem icon={Clock} label="Departure Time" value={booking.departure} />
                    <DetailItem icon={User} label="Booked For" value={booking.user} />
                    <DetailItem label="Seats" value={booking.seats.join(', ')} />
                    
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="font-bold text-lg">Total Paid</span>
                        <span className="font-extrabold text-xl text-violet-600 dark:text-violet-400">
                            BDT {booking.total.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-bold">Booking Status</span>
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold leading-5 rounded-full ${getStatusClasses(booking.status)}`}>
                            {booking.status}
                        </span>
                    </div>
                    
                    {/* Show Cancel button only for Confirmed/Pending bookings */}
                    {booking.status !== 'Cancelled' && (
                        <button className="w-full mt-4 py-3 border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition duration-300 font-semibold">
                            Cancel My Booking (Request Refund)
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
        <span className="text-gray-500 dark:text-gray-400 flex items-center">
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {label}
        </span>
        <span className="font-medium">{value}</span>
    </div>
);


/**
 * 4. Main App Component (Routing and State Management)
 */
const BookingsURL = "http://localhost:8000/booking/my-bookings/";
const UserProfileURL = "http://localhost:8000/user/profile/"
const UserDashboard = () => {

    // State for user profile
    const [userProfile, setUserProfile] = useState([]);

    // State for bookings list
    const [bookingsList, setBookingsList] = useState([]);

    // State for navigation (Profile, History)
    const [currentPage, setCurrentPage] = useState('History'); 
    
    // State for selected booking (used for the modal)
    const [selectedBooking, setSelectedBooking] = useState(null); 
    
    // State for search term in HistoryView
    const [searchTerm, setSearchTerm] = useState('');

    // get value forom local storage
    const accessToken = localStorage.getItem('accessToken');

    const handleLogout = () => {
        console.log('User Rohan Ahmed logged out.');
        // In a real app, this would clear authentication tokens and redirect to login.
        // Using console.log instead of alert for better UX in this environment.
        setCurrentPage('Profile'); // Reset for demo
    };

    const handleSelectBooking = (booking) => {
        setSelectedBooking(booking);
    };

    const getBookingsList = async()=>{
        const request = await fetch(BookingsURL,{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${accessToken}`
            },
            
        });

        if(request.ok){
            const result = await request.json();
            console.log("bookings list",result);
            
            setBookingsList(result);
        };
    };

    const getUserProfile = async () =>{
        const request = await fetch(UserProfileURL, {
            method:"GET",
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if(request.ok){
            const result = await request.json();
            console.log("user profile", result);
            setUserProfile(result);
        }
    }

    useEffect(()=>{
        getBookingsList();
        getUserProfile();
    },[]);

    const renderContent = () => {
        switch (currentPage) {
            case 'Profile':
                return <ProfileView user={userProfile} />;
            case 'History':
                return (
                    <HistoryView 
                        bookings={bookingsList} 
                        onSelectBooking={handleSelectBooking}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                );
            default:
                return <ProfileView user={MOCK_USER} />;
        }
    };

    const NavItem = ({ page, icon: Icon, label }) => (
        <button
            onClick={() => setCurrentPage(page)}
            className={`flex items-center space-x-3 p-3 rounded-xl transition duration-300 w-full text-left
                ${currentPage === page
                    ? ' text-gray-600 shadow-lg font-semibold transform scale-[1.03] sm:scale-100'
                    : 'text-gray-600 font-semibold'
                }`}
        >
            <Icon className="w-5 h-5" />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col antialiased">
            {/* Header/Navigation */}
            <header className="sticky top-0 z-10 bg-white shadow-xl p-4 sm:p-6 flex justify-between items-center border-b border-violet-300 dark:border-violet-900">
                <h1 className="text-2xl font-extrabold text-violet-700 dark:text-violet-400">
                    <span className="hidden sm:inline text-violet-950">My Ticket Dashboard</span>
                    <span className="sm:hidden">Dashboard</span>
                </h1>
                
                {/* Navigation Links */}
                <nav className="flex space-x-2 sm:space-x-4">
                    <NavItem page="Profile" icon={User} label="My Profile" />
                    <NavItem page="History" icon={History} label="My Bookings" />
                    <button
                        onClick={handleLogout}
                        className="p-3 rounded-xl  bg-red-100 text-red-600 bg-red-200bg-red-900/50 font-semibold"
                        aria-label="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </nav>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow p-4 sm:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Title for the current view */}
                    <h2 className="text-3xl font-bold mb-8  text-gray-600 border-b pb-3 border-violet-300 dark:border-violet-700">
                        {currentPage === 'Profile' ? 'My Account Profile' : 'Booking History'}
                    </h2>

                    {renderContent()}
                </div>
            </main>
            
            {/* Footer Placeholder */}
             <footer className="w-full text-center py-4 text-xs text-gray-500 dark:text-gray-600 border-t dark:border-gray-800">
                © 2024 BusTicket System. All rights reserved.
            </footer>

            {/* Booking Details Modal */}
            <BookingDetailModal 
                booking={selectedBooking} 
                onClose={() => setSelectedBooking(null)} 
            />
        </div>
    );
};

export default UserDashboard;