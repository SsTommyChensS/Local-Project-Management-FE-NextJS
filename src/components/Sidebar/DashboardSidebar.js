"use client";

import Link from "next/link";

const toggleSidebar = () => {
    let navbar_menu = document.getElementById("default-sidebar");
    if(navbar_menu.classList.contains("-translate-x-full")) {
        navbar_menu.classList.remove("-translate-x-full")
    } else {
        navbar_menu.classList.add("-translate-x-full");
    }
}

const DashboardSidebar = () => {
    return (
        <div className="sticky top-0">
            <button onClick={toggleSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                            <span className="ml-3">Dashboard </span>
                            </a>
                        </li>
                        <li>
                            <Link href="/dashboard/my-profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">My Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/my-projects" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M31,0H1A1,1,0,0,0,0,1V7.67a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V1A1,1,0,0,0,31,0ZM28.67,3.67H30V5H28.67ZM2,2H26.93a1,1,0,0,0-.26.67V6a1,1,0,0,0,.26.67H2Z" clipRule="evenodd"></path>
                                <path fillRule="evenodd" d="M31,11.67H1a1,1,0,0,0-1,1v6.66a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V12.67A1,1,0,0,0,31,11.67ZM18.67,15.33H30v1.34H18.67ZM2,13.67H16.93a1,1,0,0,0-.26.66v3.34a1,1,0,0,0,.26.66H2Z" clipRule="evenodd"></path>
                                <path fillRule="evenodd" d="M31,23.33H1a1,1,0,0,0-1,1V31a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V24.33A1,1,0,0,0,31,23.33ZM28.67,27H30v1.33H28.67ZM2,25.33H26.93a1,1,0,0,0-.26.67v3.33a1,1,0,0,0,.26.67H2Z" clipRule="evenodd"></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">My Projects</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/my-shared-projects" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M31,0H1A1,1,0,0,0,0,1V7.67a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V1A1,1,0,0,0,31,0ZM28.67,3.67H30V5H28.67ZM2,2H26.93a1,1,0,0,0-.26.67V6a1,1,0,0,0,.26.67H2Z" clipRule="evenodd"></path>
                                <path fillRule="evenodd" d="M31,11.67H1a1,1,0,0,0-1,1v6.66a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V12.67A1,1,0,0,0,31,11.67ZM18.67,15.33H30v1.34H18.67ZM2,13.67H16.93a1,1,0,0,0-.26.66v3.34a1,1,0,0,0,.26.66H2Z" clipRule="evenodd"></path>
                                <path fillRule="evenodd" d="M31,23.33H1a1,1,0,0,0-1,1V31a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V24.33A1,1,0,0,0,31,23.33ZM28.67,27H30v1.33H28.67ZM2,25.33H26.93a1,1,0,0,0-.26.67v3.33a1,1,0,0,0,.26.67H2Z" clipRule="evenodd"></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">My Shared Projects</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
};

export default DashboardSidebar;