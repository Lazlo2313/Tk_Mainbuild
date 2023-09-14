import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';

function SideBar() {
  const [loading, setLoading] = useState(true);
  const { user, logOut } = UserAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);
  const [showOrdersDropdown2, setShowOrdersDropdown2] = useState(false);
  const [showOrdersDropdown3, setShowOrdersDropdown3] = useState(false);
  const [showOrdersDropdown4, setShowOrdersDropdown4] = useState(false);

  const toggleOrdersDropdown = () => {
    setShowOrdersDropdown((prevState) => !prevState);
   
  };
  const toggleOrdersDropdown2 = () => {
  setShowOrdersDropdown2((prevState) => !prevState);
  };

  const toggleOrdersDropdown3 = () => {
    setShowOrdersDropdown3((prevState) => !prevState);
    };
    const toggleOrdersDropdown4 = () => {
      setShowOrdersDropdown4((prevState) => !prevState);
      };
  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="p-6 w-1/2 h-screen bg-gray-700 z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200 hidden md:block">
        <div className="flex flex-col justify-start item-center">
          <img
            src="https://toykingdom.co.za/wp-content/uploads/2022/05/Toy-Kingdom-Logo.png"
            alt="logo"
            width={250}
            height={50}
          />
          
          <div className=" my-4 border-b border-gray-100 pb-4">
          <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
               <Link href="/dashboard">Dashboard</Link>
              </h3> 
               </div>
                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                 <h3 className="text-base text-white group-hover:text-white font-semibold ">
                 <Link href="/customer">Search</Link>
                 </h3>
                      </div>
            {/* Dropdown for Orders */}
            <div
              className="flex mb-2 justify-start items-center text-white gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto active:bg-gray-900 "
              onClick={toggleOrdersDropdown}
            >
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
                Toy Kingdom
              </h3>
              <svg
                className={`w-6 h-6 transform ${showOrdersDropdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown content */}
            {showOrdersDropdown && (
              <div className="ml-6">
                <Link href="/collect" className="text-sm text-white group-hover:text-white font-semibold block mb-2">
                  New Orders
                </Link>
                <Link href="/collect/picked" className="text-sm text-white group-hover:text-white font-semibold block mb-2">
                  Picked Orders
                </Link>
                <Link href="/collect/packed" className="text-sm text-white group-hover:text-white font-semibold block mb-2">
                  Packed Orders
                </Link>
                <Link href="/collect/shipped" className="text-sm text-white group-hover:text-white font-semibold block mb-2">
                  Shipped Orders
                </Link>
                {/* Add more orders here */}
              </div>
            )}

  {/* Dropdown for Orders */}
  <div
              className="flex mb-2 justify-start items-center text-white gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              onClick={toggleOrdersDropdown2}
            >
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
                Build a Bear
              </h3>
              <svg
                className={`w-6 h-6 transform ${showOrdersDropdown2 ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown content */}
            {showOrdersDropdown2 && (
              <div className="ml-6">
                <Link href="/buildabear" className="text-sm text-white group-hover:text-white font-semibold block mb-2">
                  New Orders
                </Link>
                <Link href="/buildabear/packed" className="text-sm text-white group-hover:text-white font-semibold block mb-2">
                  Packed Orders
                </Link>
                <Link href="/buildabear/shipped" className="text-sm text-white group-hover:text-white font-semibold block mb-2">
                  Shipped Order
                </Link>
                {/* Add more orders here */}
              </div>
            )}
             {/* Dropdown for Orders */}
             <div
              className="flex mb-2 justify-start items-center text-white gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto active:bg-gray-900 "
              onClick={toggleOrdersDropdown3}
            >
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
                Baby Kingdom
              </h3>
              <svg
                className={`w-6 h-6 transform ${showOrdersDropdown3 ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown content */}
            {showOrdersDropdown3 && (
              <div className="ml-6">
                <Link href="/baby" className="text-sm text-white group-hover:text-white font-semibold block mb-2">
                  New Orders
                </Link>
                {/* Add more orders here */}
              </div>
            )}
             {/* Dropdown for Orders */}
             <div
              className="flex mb-2 justify-start items-center text-white gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto active:bg-gray-900 "
              onClick={toggleOrdersDropdown4}
            >
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
                Pet Kingdom
              </h3>
              <svg
                className={`w-6 h-6 transform ${showOrdersDropdown3 ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown content */}
            {showOrdersDropdown4 && (
              <div className="ml-6">
                <Link href="/pet" className="text-sm text-white group-hover:text-white font-semibold block mb-2">
                  New Orders
                </Link>
                <Link href="/pet/completed" className="text-sm text-white group-hover:text-white font-semibold block mb-2">
                  Completed
                </Link>
                {/* Add more orders here */}
              </div>
            )}
          </div>
          <div className=" my-4">
            {loading ? null : !user ? (
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <Link href="/login" className="text-base text-white group-hover:text-white font-semibold">
                  Login
                </Link>
              </div>
            ) : (
              <div className="my-4">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <p className="text-white rounded cursor-pointer" onClick={handleSignOut}>
                    Sign out
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
