"use client";

import { useState, useEffect, forwardRef } from "react";

import { getMembers, removeMember } from "@/services/memberService";

import Pagination from '../Pagination/Pagination';
import TitleHeading from '../Items/TitleHeading';
import ErrorMessage from "../Items/ErrorMessage";

import ChangePermission from "./ChangePermission";

const ListMembers = ({ project, setOption }, ref) => { 
    const [members, setMembers] = useState([]); 
    const [selectedMember, setSelectedMember] = useState({});
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [openChangePermission, setOpenChangePermission] = useState(false);
    const [openInviteUser, setOpenInviteUser] = useState(false);

    //Get attachments by project
    const handleGetMembers = (currentPage) => {
        getMembers(project._id, currentPage)
            .then(response => {
                const response_data = response.data;
                const items = response_data.data;
                const totalItems = response_data.totalItems;
                const itemsEachPage = response_data.itemsEachPage;
                //Count total pages 
                const pages = Math.ceil(totalItems / itemsEachPage);
                setMembers(items);
                setTotalPage(pages);
            })
            .catch(error => {
                console.log(error.response);
            })
    }; 

    //Remove attachment
    const handleRemoveMember = (member) => {
        const project_id = project._id;
        const member_id = member.member._id;
        const member_fullname =  member.member.fullname;

        if(confirm(`Are you sure to remove this member: ${member_fullname}`)) {
            removeMember(project_id, member_id)
                .then(response => {
                    alert(`You have removed member: ${member_fullname} successfully!`);
                    //Get projects after remove
                    setCurrentPage(1);
                    handleGetMembers(currentPage);
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
    }

    //Handle open change permission
    const handleOpenChangePermission = (member) => {
        setSelectedMember(member);
        setOpenChangePermission(true);
    }

    //List members
    const list_members = members.map((item, index) => {
        return (
            <tr key={item.member._id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4">{index+1}</td>
                <td className="px-6 py-4">
                    <img src={item.member.avatar.url} width={100} height={100} alt="Member's avatar"/>
                </td>
                <td className="px-6 py-4">{item.member.fullname}</td>
                <td className="px-6 py-4">{item.member.email}</td>
                <td className="px-6 py-4">{displayMemberPermission(item.permission)}</td>
                <td className="px-6 py-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <button onClick={() => handleOpenChangePermission(item)} className="bg-orange-200 hover:bg-orange-300 p-2 rounded-lg w-max">Change permission <img src="/permission.svg" className="inline ml-2 h-3"/></button>
                    <button onClick={() => handleRemoveMember(item)} className="bg-red-700 hover:bg-red-800 text-white p-2 rounded-lg w-max">Remove <img src="/remove.svg" className="inline ml-2 h-3"/></button>
                </td>
            </tr>
        )
    })

    useEffect(() => {
        handleGetMembers(currentPage);
    }, [project, currentPage])

    return (
        <div ref={ref} className="list-members-section w-4/5 mt-4 px-4">
            <TitleHeading titleMessage="All members at project" item={project.title} setOption={setOption}/>       
            <div className="list-members__table mt-4 relative shadow-md overflow-x-auto">
                <table className="table-auto text-sm text-left text-gray-500 bg-gray-500 w-full">
                        <thead className="text-xs text-white uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">No</th>
                                <th scope="col" className="px-6 py-3">Avatar</th>
                                <th scope="col" className="px-6 py-3">Fullname</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Permission</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_members}
                        </tbody>
                </table>
            </div>
            {
                members.length != 0  
                ? <Pagination totalPage={totalPage} setPage={setCurrentPage} currentPage={currentPage} />
                : <ErrorMessage message="There aren't any members!"/>
            }
            <div className="px-4 py-6">
                <button onClick={() => setOpenInviteUser(!openInviteUser)} className="bg-orange-400 text-white p-2 rounded-lg hover:bg-orange-700">Invite
                    <svg className="inline fill-white ml-1" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Edit / Add_Plus">
                        <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
            </div>
            {
                openChangePermission && <ChangePermission member={selectedMember} project={project} setOpenChangePermission={setOpenChangePermission}/>
            }
        </div>
    )
};

//Display member's permission
const displayMemberPermission = (permission) => {
    switch (permission) {
        case 1: { return (
            <span className="text-green-300 font-bold">View</span>
        )}
        case 2: { return (
            <span className="text-yellow-300 font-bold">Edit</span>
        )}
        case 3: { return (
            <span className="text-blue-300 font-bold">Full</span>
        )}
    }
}

export default forwardRef(ListMembers);