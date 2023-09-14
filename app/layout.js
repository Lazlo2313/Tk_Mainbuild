"use client";
import SideBar from "./components/SideBar";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <SideBar/>
          <div className="lg:ml-60 p-6 ">
          {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
