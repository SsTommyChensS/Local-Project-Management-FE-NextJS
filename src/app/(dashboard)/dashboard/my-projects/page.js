"use client";

import { useState, useEffect, useRef } from 'react';
import style from './myprojects.module.css';

import Pagination from '@/components/Pagination/Pagination';
import AddProject from '@/components/Project/AddProject';
import DetailProject from '@/components/Project/DetailProject';
import ListMembers from '@/components/Member/ListMembers';
import ListComments from '@/components/Comment/ListComments';
import ListAttachments from '@/components/Attachment/ListAttachments';

import { getMyProjects, getMyProjectsByStatus, getMyProjectsByTitle, removeProject } from '@/services/projectService';

const MyProjects = () => {
    const [option, setOption] = useState(0);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [title, setTitle] = useState('');
    const removeProjectModal = useRef();
    const memberElement = useRef(null);
    const detailProjectElement = useRef(null);
    const addProjectElement = useRef(null);
    const commentElement = useRef(null);
    const attachmentElement = useRef(null);
    //Toggle remove project modal
    const handleOpenRemoveProjectModal = (data) => {
        setSelectedProject(data);
        removeProjectModal.current.classList.remove("hidden");
    };
    const handleCloseRemoveProjectModal = () => {
        removeProjectModal.current.classList.add("hidden"); 
    };

    //Display button
    const displayButton = (project) => {
        return (
            <>
                <button onClick={() => handleOpenDetailProject(project)}className="bg-yellow-700 hover:bg-yellow-800 text-white p-2 rounded-lg w-full">Details <img src="/detail.svg" className="inline ml-2 w-4 h-4"/></button>
                <button onClick={() => handleOpenRemoveProjectModal(project)} className="bg-red-700 hover:bg-red-800 text-white p-2 rounded-lg w-full">Remove <img src="/remove.svg" className="inline ml-2 w-3 h-3"/></button>
                <button onClick={() => handleOpenListMembers(project)} className="bg-pink-700 hover:bg-pink-800 text-white p-2 rounded-lg w-full">Members <img src="/member.svg" className="inline ml-2 w-4 h-4"/></button>
                <button className="bg-green-700 hover:bg-green-800 text-white p-2 rounded-lg w-full">Tasks <img src="/task.svg" className="inline ml-2 w-4 h-4"/></button>
                <button onClick={() => handleOpenListComments(project)} className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg w-full">Comments <img src="/comment.svg" className="inline ml-2 w-4 h-4"/></button>
                <button onClick={() => handleOpenListAttachments(project)} className="bg-orange-400 hover:bg-orange-500 text-white p-2 rounded-lg w-full">Attachments <img src="/attachment.svg" className="inline ml-2 w-4 h-4"/></button>
            </>
        )
    };

    //List projects
    const list_projects = projects.map((project, index) => {
        return (
            <tr key={project._id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4">{index+1}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {project.title}
                </th>
                <td className="px-6 py-4 break-all">{project.description}</td>
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
    }; 
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
    };
    //Get projects by title
    const onKeyUp = event => {
        if(event.key === 'Enter') {
            handleGetProjectsByTitle();
        }
    };
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
    };
    //Remove project
    const handleRemoveProject = () => {
        const project_id = selectedProject._id;
        removeProjectModal.current.classList.add("hidden"); 
        removeProject(project_id)
            .then(response => {
                alert(`You have removed project: ${selectedProject.title} successfully!`);
                //Get projects after remove
                setCurrentPage(1);
                handleGetMyProjects(currentPage);
            })
            .catch(error => {
                console.log(error.response);
            })       
    };
    //Handle change title
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    //Create new project
    const handleOpenCreateProject = () => {
        setOption(1);
        addProjectElement.current?.scrollIntoView({behavior: "smooth"});
    }
    //Detail project
    const handleOpenDetailProject = (data) => {
        setOption(2);
        setSelectedProject(data);
        detailProjectElement.current?.scrollIntoView({behavior: "smooth"});
    };
    //List members
    const handleOpenListMembers = (data) => {
        setOption(3);
        setSelectedProject(data);
        memberElement.current?.scrollIntoView({behavior: "smooth"});
    }
    //List comments
    const handleOpenListComments = (data) => {
        setOption(5);
        setSelectedProject(data);
        commentElement.current?.scrollIntoView({behavior: "smooth"});
    }
    //List attachments
    const handleOpenListAttachments = (data) => {
        setOption(6);
        setSelectedProject(data);
        attachmentElement.current?.scrollIntoView({behavior: "smooth"});      
    };

    useEffect(() => {
        handleGetMyProjects(currentPage);
    }, [currentPage])

    return (
        <div className="myprojects p-4 w-full">
            {/* Remove project modal */}
            <div ref={removeProjectModal} id="popup-modal" tabIndex="-1" className="fixed top-1/4 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 hidden p-4 overflow-x-hidden overflow-y-auto max-h-full">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={handleCloseRemoveProjectModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to remove this project?</h3>
                            <button onClick={handleRemoveProject} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Yes, I'm sure
                            </button>
                            <button onClick={handleCloseRemoveProjectModal} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* My Project section */}
            <h1 className={style.myprojects__title}>My Projects</h1>
            <div className={style.myprojects__search_filter}>
                    <div className="myproject__search_filter__title w-80">
                        <label htmlFor="search_title">Title:</label>
                        <div className="search_title__input flex">
                            <input onChange={handleChangeTitle} onKeyUp={onKeyUp} type="text" id="search_title" name="search_title" className="bg-gray-700 text-white w-full p-2.5 rounded-md" placeholder="Type here"/>
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
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Progress</th>
                                <th scope="col" className="px-6 py-3">Start Date</th>
                                <th scope="col" className="px-6 py-3">End Date</th>
                                <th scope="col" className="px-6 py-3 w-40">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_projects}
                        </tbody>
                </table>
            </div>
            {
                projects.length != 0 && 
                <Pagination totalPage={totalPage} setPage={setCurrentPage} currentPage={currentPage} />
            }
            
            <div className="px-4 py-6">
                <button onClick={handleOpenCreateProject} className="bg-green-400 text-white p-2 rounded-lg hover:bg-green-700">Add Project
                    <svg className="inline fill-white ml-1" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Edit / Add_Plus">
                        <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
            </div>
            { option == 1 && <AddProject ref={addProjectElement} setOption={setOption}/> }
            { option == 2 && <DetailProject ref={detailProjectElement} project={selectedProject} setOption={setOption}/> }
            { option == 3 && <ListMembers ref={memberElement} project={selectedProject} setOption={setOption}/> }
            { option == 5 && <ListComments ref={commentElement} project={selectedProject} setOption={setOption}/> }
            { option == 6 && <ListAttachments ref={attachmentElement} project={selectedProject} setOption={setOption}/> }
        </div>
    )
};

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

export default MyProjects;