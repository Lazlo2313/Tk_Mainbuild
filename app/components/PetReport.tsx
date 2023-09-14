"use client"
import React, { useEffect, useState } from 'react';
import getData from '../lib/getPetReport'
import Link from 'next/link';

export default function Reports() {
  const [newOrderData, setNewOrderData] = useState(null);
  const [orderBeingPickedData, setOrderBeingPickedData] = useState(null);
  const [OrderShippedData, setOrderShippedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setNewOrderData(response.find((status) => status.slug === 'processing'));
        setOrderBeingPickedData(response.find((status) => status.slug === 'completed'));
        setOrderShippedData(response.find((status) => status.slug === 'shipped-order'));
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
      <h1 className='mt-10 text-2xl font-bold'>Pet Kingdom Orders</h1>
      {loading ? (
        <p>Fetching data...</p>
      ) : (
        <>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
            <Link href='/pet'>
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
              <Link href='/pet/completed'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              </Link>
            </div>

            <div className="ml-4">
              <h2 className="font-semibold">Orders Completed</h2>
              {orderBeingPickedData ? (
                <>
                  <p>Total Orders: {orderBeingPickedData.total}</p>
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
