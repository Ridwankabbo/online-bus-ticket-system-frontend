import React, { useState } from 'react';

// Tailwind CSS is assumed to be available in the environment.

const GREEN_COLOR = 'emerald'; // Tailwind uses 'emerald' for a vibrant green
const GREEN_ACCENT_CLASS = `bg-${GREEN_COLOR}-600 hover:bg-${GREEN_COLOR}-700 text-white`;
const GREEN_TEXT_CLASS = `text-${GREEN_COLOR}-600`;
const GREEN_BORDER_CLASS = `border-${GREEN_COLOR}-600`;

/**
 * Custom alert replacement using a console log, as native alerts are prohibited.
 * In a real application, this would trigger a styled modal component.
 */
const simulatePayment = (method) => {
    console.log(`${method} payment initiated.`);
    // A real application would integrate with a payment service here.
    alert('Payment simulation successful! Thank you for booking.');
};

// Custom Modal/Message Box (Simple implementation)
const MessageModal = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full border-t-4 border-green-500">
            <div className="flex items-center mb-4">
                <i className="fas fa-check-circle text-green-500 text-2xl mr-3"></i>
                <h3 className="text-xl font-semibold text-gray-800">Success!</h3>
            </div>
            <p className="text-gray-600 mb-6">{message}</p>
            <button onClick={onClose} className={`w-full py-2 rounded-lg font-medium transition-colors ${GREEN_ACCENT_CLASS}`}>
                Continue
            </button>
        </div>
    </div>
);


const OrderSummary = () => (
    <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit sticky top-4 lg:top-20">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Order Summary</h3>
        
        <div className="space-y-3 text-gray-700">
            <div className="flex justify-between items-center text-sm">
                <span>Route</span>
                <span className="font-medium">Dhaka &rarr; Cox's Bazar</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span>Bus Operator</span>
                <span className="font-medium">Shohag Paribahan</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span>Date & Time</span>
                <span className="font-medium">06 Dec 2025, 10:00 AM</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span>Seats</span>
                <span className="font-medium">A1, A2 (2)</span>
            </div>
        </div>

        <div className="border-t border-dashed border-gray-300 my-4 pt-4 space-y-2">
            <div className="flex justify-between items-center text-gray-600 text-sm">
                <span>Ticket Price (2 seats)</span>
                <span>৳1900.00</span>
            </div>
            <div className="flex justify-between items-center text-gray-600 text-sm">
                <span>Service Charge</span>
                <span>৳50.00</span>
            </div>
            <div className="flex justify-between items-center text-gray-600 text-sm">
                <span>Discount</span>
                <span className="text-red-500 font-medium">- ৳100.00</span>
            </div>
        </div>

        <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">Total Payable</span>
            <span className="text-2xl font-bold text-green-600">৳1850.00</span>
        </div>
    </aside>
);

const CardForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        simulatePayment('Card');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input type="text" id="card-number" placeholder="XXXX XXXX XXXX XXXX" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-shadow" />
            </div>

            <div>
                <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input type="text" id="card-name" placeholder="John Doe" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-shadow" />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (MM/YY)</label>
                    <input type="text" id="expiry-date" placeholder="05/26" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-shadow" />
                </div>
                <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input type="password" id="cvv" placeholder="***" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-shadow" />
                </div>
            </div>

            <div className="pt-4">
                <button type="submit" className={`w-full font-semibold py-3 rounded-lg transition-colors duration-300 shadow-lg ${GREEN_ACCENT_CLASS}`}>
                    Pay ৳1850.00 Now
                </button>
            </div>
        </form>
    );
};

const MobileForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        simulatePayment('Mobile Banking');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="mobile-provider" className="block text-sm font-medium text-gray-700 mb-1">Mobile Banking Provider</label>
                <select id="mobile-provider" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-shadow">
                    <option>Bkash</option>
                    <option>Nagad</option>
                    <option>Rocket</option>
                </select>
            </div>
            <div>
                <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 mb-1">Mobile Account Number</label>
                <input type="tel" id="mobile-number" placeholder="01XXXXXXXXX" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-shadow" />
            </div>
            <div className="pt-4">
                <button type="submit" className={`w-full font-semibold py-3 rounded-lg transition-colors duration-300 shadow-lg ${GREEN_ACCENT_CLASS}`}>
                    Proceed to Pay (৳1850.00)
                </button>
            </div>
        </form>
    );
};


const PaymentView = ({seats, total_amount}) => {
    const [activeTab, setActiveTab] = useState('card');
    const [modalVisible, setModalVisible] = useState(false);

    // Override the prohibited alert() for a soft visual indicator
    const alert = (message) => {
        console.log("Alert (Internal):", message);
        setModalVisible(true);
    };

    const tabClass = (tabName) => (
        `pb-3 px-4 font-medium text-sm border-b-2 transition-colors duration-200 focus:outline-none ${
            activeTab === tabName 
                ? `${GREEN_BORDER_CLASS} ${GREEN_TEXT_CLASS}` 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            
            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <span className="text-2xl font-bold text-gray-800">
                                <i className={`fas fa-bus ${GREEN_TEXT_CLASS} mr-2`}></i>BusPass Payment
                            </span>
                        </div>
                        <div className={`flex items-center space-x-2 ${GREEN_TEXT_CLASS} text-sm font-medium`}>
                            <i className="fas fa-lock"></i>
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Details</h1>

                {/* Layout: Payment Form (Left) and Order Summary (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Payment Form (Col 2/3) */}
                    <section className="lg:col-span-2 bg-white p-6 md:p-8 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Choose Payment Method</h2>

                        {/* Tabs for Payment Options */}
                        <div className="flex border-b border-gray-200 mb-6">
                            <button onClick={() => setActiveTab('card')} className={tabClass('card')}>
                                <i className="fas fa-credit-card mr-2"></i> Card
                            </button>
                            <button onClick={() => setActiveTab('mobile')} className={tabClass('mobile')}>
                                <i className="fas fa-mobile-alt mr-2"></i> Mobile Banking
                            </button>
                        </div>
                        
                        {/* Conditional Forms */}
                        <div className={activeTab === 'card' ? 'block' : 'hidden'}>
                            <CardForm />
                        </div>
                        <div className={activeTab === 'mobile' ? 'block' : 'hidden'}>
                            <MobileForm />
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            Your financial details are protected by 256-bit encryption.
                        </div>

                    </section>
                    
                    {/* Order Summary (Col 1/3) */}
                    <OrderSummary />
                </div>
            </div>

            {/* Success Modal */}
            {modalVisible && (
                <MessageModal 
                    message="Your transaction has been processed successfully. A confirmation email is on its way!" 
                    onClose={() => setModalVisible(false)}
                />
            )}
        </div>
    );
};

export default PaymentView;