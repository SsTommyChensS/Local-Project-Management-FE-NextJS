"use client";

import { useState, useEffect } from 'react';
import style from './myprojects.module.css';

import Pagination from '@/components/Pagination/Pagination';
import AddProject from '@/components/Project/AddProject';

import { getMyProjects, getMyProjectsByStatus, getMyProjectsByTitle } from '@/services/projectService';

const MyProjects = () => {
    const [option, setOption] = useState(0);
    const [projects, setProjects] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [title, setTitle] = useState('');

    const list_projects = projects.map((project, index) => {
        return (
            <tr key={project._id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4">{index+1}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {project.title}
                </th>
                <td className="px-6 py-4">{project.description}</td>
                <td className="px-6 py-4">{project.content}</td>
                <td className="px-6 py-4">{displayStatus(project.status)}</td>
                <td className="px-6 py-4">{project.progress + ' %'}</td>
                <td className="px-6 py-4">{displayDate(project.start_date)}</td>
                <td className="px-6 py-4">{displayDate(project.end_date)}</td>
                <td className="px-6 py-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {displayButton(project)}
                </td>
            </tr>
        )
    });

    //Get my projects
    const handleGetMyProjects = (currentPage) => {
        getMyProjects(currentPage)
            .then(response => {
                const response_data = response.data;
                const items = response_data.data;
                const totalItems = response_data.totalItems;
                const itemsEachPage = response_data.itemsEachPage;
                //Count total pages 
                const pages = Math.ceil(totalItems / itemsEachPage);
                setProjects(items);
                setTotalPage(pages);
            })
            .catch(error => {
                console.log(error.response);
            })
    } 
    //Get projects by status
    const handleGetProjectsByStatus = (e) => {
        setCurrentPage(1);
        const status = e.target.value;
        if(status == 5) {
            handleGetMyProjects(currentPage);
        } else {
            getMyProjectsByStatus(status, currentPage)
                .then(response => {
                    const response_data = response.data;
                    const items = response_data.data;

                    const totalItems = response_data.totalItems;
                    const itemsEachPage = response_data.itemsEachPage;
                    //Count total pages 
                    const pages = Math.ceil(totalItems / itemsEachPage);
                    setProjects(items);
                    setTotalPage(pages);
                })
                .catch(error => {
                    console.log(error.response);
                })
        }      
    }
    //Get projects by title
    const handleGetProjectsByTitle = () => {
        setCurrentPage(1);
        if(title != '') {     
            const title_trim = title.trim();
            getMyProjectsByTitle(title_trim, currentPage)
                .then(response => {
                    const response_data = response.data;
                    const items = response_data.data;

                    const totalItems = response_data.totalItems;
                    const itemsEachPage = response_data.itemsEachPage;
                    //Count total pages 
                    const pages = Math.ceil(totalItems / itemsEachPage);
                    setProjects(items);
                    setTotalPage(pages);
                })
                .catch(error => {
                    console.log(error.response);
                })
        } else {
            handleGetMyProjects(currentPage);
        }
    }

    //Handle change title
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    useEffect(() => {
        handleGetMyProjects(currentPage);
    }, [currentPage])

    return (
        <div className="myprojects p-4 w-full">
            <h1 className={style.myprojects__title}>My Projects</h1>
            <div className={style.myprojects__search_filter}>
                    <div className="myproject__search_filter__title w-80">
                        <label htmlFor="search_title">Title:</label>
                        <div className="search_title__input flex">
                            <input onChange={handleChangeTitle} type="text" id="search_title" name="search_title" className="bg-gray-700 text-white w-full p-2.5 rounded-md" placeholder="Type here"/>
                            <button onClick={handleGetProjectsByTitle} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                    <div className="myproject__search_filter__status">
                        <label htmlFor="search_status">Status:</label>
                        <select onChange={handleGetProjectsByStatus} name="search_status" defaultValue={'default'} id="search_status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value='default' disabled>Choose a status</option>
                            <option value="1">New</option>
                            <option value="2">In Progress</option>
                            <option value="3">Done</option>
                            <option value="4">Out of date</option>
                            <option value="5">All</option>
                        </select>
                    </div>
            </div>
            <div className="relative shadow-md overflow-x-auto">
                <table className="table-auto text-sm text-left text-gray-500 bg-gray-500 w-full">
                        <thead className="text-xs text-white uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">No</th>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Content</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Progress</th>
                                <th scope="col" className="px-6 py-3">Start Date</th>
                                <th scope="col" className="px-6 py-3">End Date</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_projects}
                        </tbody>
                </table>
            </div>
            {
                projects.length != 0 && 
                <Pagination totalPage={totalPage} setPage={setCurrentPage}/>
            }
            
            <div className="px-4 py-6">
                <button className="bg-green-400 text-white p-2 rounded-lg hover:bg-green-700">Add Project
                    <svg className="inline fill-white ml-1" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Edit / Add_Plus">
                        <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    )
};

//Display button
const displayButton = (project) => {
    return (
        <>
            <button onClick={() => actionData.hello(project)} className="bg-yellow-700 hover:bg-yellow-800 text-white p-2 rounded-lg w-full">Update <img src="/update.svg" className="inline ml-2 w-4 h-4"/></button>
            <button className="bg-red-700 hover:bg-red-800 text-white p-2 rounded-lg w-full">Remove <img src="/remove.svg" className="inline ml-2 w-3 h-3"/></button>
            <button className="bg-pink-700 hover:bg-pink-800 text-white p-2 rounded-lg w-full">Members <img src="/member.svg" className="inline ml-2 w-4 h-4"/></button>
            <button className="bg-green-700 hover:bg-green-800 text-white p-2 rounded-lg w-full">Tasks <img src="/task.svg" className="inline ml-2 w-4 h-4"/></button>
            <button className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg w-full">Comments <img src="/comment.svg" className="inline ml-2 w-4 h-4"/></button>
            <button className="bg-orange-400 hover:bg-orange-500 text-white p-2 rounded-lg w-full">Attachments <img src="/attachment.svg" className="inline ml-2 w-4 h-4"/></button>
        </>
    )
}

//Display status
const displayStatus = (status) => {
    switch(status){
        case 1: { return (
            <span className="text-green-300 font-bold">New</span>
        )}
        case 2: { return (
            <span className="text-yellow-300 font-bold">In Progress</span>
        )}
        case 3: { return (
            <span className="text-blue-300 font-bold">Done</span>
        )}
        case 4: { return (
            <span className="text-red-600 font-bold">Out of date</span>
        )}
    }
};

//Convert date time
const displayDate = (data) => {
    let date = new Date(data);
    let date_convert = date.toLocaleDateString();
    return date_convert;
};

const actionData = {
    hello: function (project) {
        console.table(project);
    }
}

export default MyProjects;