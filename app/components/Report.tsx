"use client"
import React, { useEffect, useState } from 'react';
import getData from '../lib/getReport'
import Link from 'next/link';

export default function Reports() {
  const [newOrderData, setNewOrderData] = useState(null);
  const [orderBeingPickedData, setOrderBeingPickedData] = useState(null);
  const [OrderShippedData, setOrderShippedData] = useState(null);
  const [OrderPackedData, setOrderPackedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setNewOrderData(response.find((status) => status.slug === 'processing'));
        setOrderBeingPickedData(response.find((status) => status.slug === 'stock-in-transit'));
        setOrderShippedData(response.find((status) => status.slug === 'shipped-order'));
        setOrderPackedData(response.find((status) => status.slug === 'order-being-packe'));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold'>Toy Kingdom Orders</h1>
      {loading ? (
        <p>Fetching data...</p>
      ) : (
        <>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                <Link href='/orders'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
            </Link>
            </div>

            <div className="ml-4">
              <h2 className="font-semibold">New Orders</h2>
              {newOrderData ? (
                <>
                  <p>Total Orders: {newOrderData.total}</p>
               
                </>
              ) : (
                <p>No processing orders data available.</p>
              )}
            </div>
          </div>
          
          <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
            <Link href='/collect/picked'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            </div>

            <div className="ml-4">
              <h2 className="font-semibold">Orders Being Picked</h2>
              {orderBeingPickedData ? (
                <>
                  <p>Total Orders: {orderBeingPickedData.total}</p>
                </>
              ) : (
                <p>No orders in transit data available.</p>
              )}
            </div>
          </div>
          
          <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
              <Link href='/collect/packed'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        </Link>
            </div>
            <div className="ml-4">
              <h2 className="font-semibold">Order Packed</h2>
              {OrderPackedData ? (
                <>
                  <p>Total Orders: {OrderPackedData.total}</p>
               
                </>
              ) : (
                <p>No processing orders data available.</p>
              )}
            </div>
          </div>

          <div className="flex items-start rounded-xl bg-white p-4 shadow-lg h-20">
          <Link href='/collect/shipped'>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            </Link>

            <div className="ml-4">
              <h2 className="font-semibold">Shipped</h2>
              {OrderShippedData ? (
                <>
                  <p>Total Orders: {OrderShippedData.total}</p>
                </>
              ) : (
                <p>No orders in transit data available.</p>
              )}
            </div>
          </div>
        </div>
        </>
      )}
      
    </div>
  );
}
