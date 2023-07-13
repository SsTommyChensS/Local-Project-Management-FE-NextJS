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
                                <img src="/dashboard_sidebar/dashboard-icon.svg" width={30} height={30} alt="Dashboard icon"/>
                                <span className="ml-3">Dashboard </span>
                            </a>
                        </li>
                        <li>
                            <Link href="/dashboard/my-profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <img src="/dashboard_sidebar/my-profile-icon.svg" width={30} height={30} alt="My profile icon"/>
                                <span className="flex-1 ml-3 whitespace-nowrap">My Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/my-projects" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <img src="/dashboard_sidebar/my-project-icon.svg" width={30} height={30} alt="My project icon"/>
                                <span className="flex-1 ml-3 whitespace-nowrap">My Projects</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/my-shared-projects" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <img src="/dashboard_sidebar/my-shared-project-icon.svg" width={30} height={30} alt="My shared project icon"/>
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