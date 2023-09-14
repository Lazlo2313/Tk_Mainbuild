import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const handleSignOut = async () => {
    try {
      await logOut();
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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };
  return (
    <div className="bg-gray-700">
      <div className="h-20 w-full flex items-center justify-between p-2 container mx-auto text-white">
        <ul className="flex">
          <li>
            <img src="https://toykingdom.co.za/wp-content/uploads/2022/05/Toy-Kingdom-Logo.png" alt="logo" width={200} height={50} />
          </li>
          {!user ? null : (
            <>
              <li className="relative group ml-2 p-2 cursor-pointer" onClick={toggleDropdown}>
                <Link href="#">TK Orders</Link>
                <ul className={`absolute left-0 bg-gray-800 rounded-md mt-2 w-40  ${dropdownOpen ? 'block' : 'hidden'}`}>
                  <li className="p-2">
                    <Link href="/orders">New Orders</Link>
                  </li>
                  <li className="p-2">
                    <Link href="/collect/picked">Picked Orders</Link>
                  </li>
                  <li className="p-2">
                    <Link href="/collect/">Shipped Orders</Link>
                  </li>
                </ul>
              </li>
              <li className="relative group ml-2 p-2 cursor-pointer" onClick={toggleDropdown2}>
                <Link href="#">Collect & Collect</Link>
                <ul className={`absolute left-0 bg-gray-800 rounded-md mt-2 w-40  ${dropdownOpen2 ? 'block' : 'hidden'}`}>
                  <li className="p-2">
                    <Link href="/collect">New Orders</Link>
                  </li>
                  <li className="p-2">
                    <Link href="/click/">Received</Link>
                  </li>
                  <li className="p-2">
                    <Link href="/click/">History</Link>
                  </li>
                </ul>
              </li>
              <li className="p-2 cursor-pointer">
                <Link href="/profile">Profile</Link>
              </li>
            </>
          )}
        </ul>

        {loading ? null : !user ? (
          <ul className="text-white rounded">
            <Link href="/login" className="p-2 cursor-pointer">
              Login
            </Link>
          </ul>
        ) : (
          <div>
            <p className="text-white rounded cursor-pointer" onClick={handleSignOut}>
              Sign out
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
