"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react"
import { deleteCookie, getCookie } from "cookies-next";

import { logout } from "@/services/authService";
import { redirect } from "next/dist/server/api-utils";

const handleNavbarToggle = () => {
    let navbar_menu = document.getElementById("navbar-default");
    if(navbar_menu.classList.contains("hidden")) {
        navbar_menu.classList.remove("hidden")
    } else {
        navbar_menu.classList.add("hidden");
    }
}

const handleLogout = () => {
    logout()
        .then(response => {
            const success_message = response.data.message;
            alert(success_message);
        })
        .catch(error => {
            console.log(error);
        });

    //Remove accessToken in cookie
    deleteCookie("token");
    deleteCookie("username");
    window.location.href = '/home';
}

const DashboardNavbar = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const username_data = getCookie("username");
        setUsername(username_data);
    }, []);

    return (
        <div className="navbar">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center">
                        <Image src="/local_project_icon.svg" width={40} height={40} className="mr-3" alt="Local Project Management icon"/>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dashboard</span>
                    </a>
                    <button onClick={handleNavbarToggle} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href="" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Hello <span className="text-red-700">{username}</span></Link>
                            </li>
                            <li>
                                <Link onClick={handleLogout} href="/home" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline ml-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default DashboardNavbar