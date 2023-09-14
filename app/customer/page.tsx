'use client'

import React, { useState } from 'react';

function Welcome(props) {


    const [isContactModalOpen, setContactModalOpen] = useState(false);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const cors = require('cors');
    
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        mobileNumber: '',
    });
    const [searchData, setSearchData] = useState({
        name: '',
        email: '',
        accountNumber: '',
        mobileNumber: '',

    });

    const toggleContactModal = () => {
        setContactModalOpen(!isContactModalOpen);
    };

    const toggleSearchModal = () => {
        setSearchModalOpen(!isSearchModalOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSearchInputChange = (e) => {
        const { name, value } = e.target;
        setSearchData({
            ...searchData,
            [name]: value,
        });
    };

    const openContactForm = () => {
        setContactModalOpen(true);
    };

    const openSearchForm = () => {
        setSearchModalOpen(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Before fetch');
            const response = await fetch('https://toykingdom.ngrok.io/api/v1/trader/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store' // Set cache control to 'no-store'
            });
            console.log('After fetch');
            console.log('Response Status:', response.status);
            console.log('Response Text:', await response.text());

            if (response.ok) {
                // Handle success, e.g., show a success message or redirect
                console.log('Form submitted successfully');
            } else {
                // Handle error, e.g., show an error message
                console.error('Error submitting form');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Network error:', error);
        }
    };

    return (

        <>
                {/* Add your title */}
                <h1 className="text-3xl font-bold">Customer Portal</h1>

                {/* Add an image */}
                <img
                    src="https://toykingdom.co.za/wp-content/uploads/2022/05/Toy-Kingdom-Logo.png"
                    alt="Toykingdom Logo"
                    className="w-auto h-auto mt-4" // Adjust the size and spacing as needed
                />

            <div>
                <div className="grid grid-cols-4 gap-4">
                    {/* Add content for the first column */}
                    <div className="col-span-1 bg-white shadow-md p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">Add New User</h1>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={openContactForm}
                        >
                            Add User
                        </button>
                    </div>

                    {/* Add content for the second column */}
                    <div className="col-span-1 bg-white shadow-md p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">Search Customer</h1>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={openSearchForm}
                        >
                            Customer Search
                        </button>
                    </div>

                    {/* Add content for the third and fourth columns */}
                    <div className="col-span-1 bg-white shadow-md p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">Click and Collect Orders</h1>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            View Orders
                        </button>
                    </div>
                    <div className="col-span-1 bg-white shadow-md p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">Toykingdom Notice Board</h1>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            View Notice Board
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact Form Modal */}
            {isContactModalOpen && (
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 transition-opacity`}
                    onClick={toggleContactModal}
                ></div>
            )}
            {isContactModalOpen && (
                <div
                    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg z-50`}
                >
                    <span
                        className="absolute top-0 right-0 p-2 cursor-pointer"
                        onClick={toggleContactModal}
                    >
                        &times;
                    </span>
                    <h2 className="text-2xl font-semibold mb-4">Customer Creation</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                            Surname:
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                            Mobile Number:
                        </label>
                        <input
                            type="number"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            )}

            {/* Search Form Modal */}
            {isSearchModalOpen && (
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 transition-opacity`}
                    onClick={toggleSearchModal}
                ></div>
            )}
            {isSearchModalOpen && (
                <div
                    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg z-50`}
                >
                    <span
                        className="absolute top-0 right-0 p-2 cursor-pointer"
                        onClick={toggleSearchModal}
                    >
                        &times;
                    </span>
                    <h2 className="text-2xl font-semibold mb-4">Search Form</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Search by Name, Email, Account Number or Mobile:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={searchData.name}
                            onChange={handleSearchInputChange}
                            className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit} // Add the handleSubmit function to the button's onClick
                        className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Search
                    </button>
                </div>
            )}
        </>
    );
}

export default Welcome;
