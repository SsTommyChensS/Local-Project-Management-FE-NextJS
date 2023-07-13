"use client";

import { useState, useEffect } from "react";

import ErrorMessage from "../Items/ErrorMessage";
import SuccessMessage from "../Items/SuccessMessage";

import { changeMemberPermission } from "@/services/memberService";

const ChangePermission = ({ member, project, setOpenChangePermission }) => {
    const [permission, setPermission] = useState(1);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [displayMsg, setDisplayMsg] = useState(false);
    
    const handleSubmit = e => {
        e.preventDefault();
        const project_id = project._id;
        const member_id = member.member._id;

        if(member.permission == permission) {
            setErrorMsg('Nothing to update!');
            setDisplayMsg(true);

            setTimeout(() => {
                setErrorMsg('');
                setDisplayMsg(false);
            }, 2000);
        } else {
            const data = {
                user_id: member_id,
                permission: permission
            };
            changeMemberPermission(project_id, data)
                .then(response => {
                    setSuccessMsg(`Change permission for member ${member.member.fullname} successfully!`);
                    setDisplayMsg(true);
        
                    setTimeout(() => {
                        setSuccessMsg('');
                        setDisplayMsg(false);
                    }, 2000);
                })
                .catch(error => {
                    const error_response = error.response;

                    setErrorMsg(`Error ${error_response.status}: ${error_response.data.message}`);
                    setDisplayMsg(true);
        
                    setTimeout(() => {
                        setErrorMsg('');
                        setDisplayMsg(false);
                    }, 2000);
                })
        }


    }

    //Display message
    const DisplayMessage = () => {
        if(displayMsg && successMsg != '') {
            return (
                <SuccessMessage message={successMsg} />
            )
        } 

        if(displayMsg && errorMsg != '') {
            return (
                <ErrorMessage message={errorMsg} />
            )
        }
    }

    useEffect(() => {
        setPermission(member.permission);
    }, [member])

    return (
        <div className="change-permission-section mt-2 w-2/3">
            <div className="change-permission__heading bg-lime-300 text-green-800 p-4 rounded-lg  flex justify-between gap-x-10">
                <h1 className="capitalize">Change permission for member <span className="text-red-600 text-xl font-bold">{member.member.fullname}</span></h1>
                <button onClick={() => setOpenChangePermission(false)}>
                    <img src="/cancel.svg" width={30} height={30} alt="Cancel icon"/>
                </button>
            </div>
            <div className="change-permission__form m-2">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="permission" className="mb-2 text-sm font-medium text-gray-900">Permission</label>
                    <select id="permission" value={permission} onChange={(e) => setPermission(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="default" disabled>Choose a status</option>
                        <option value="1">View</option>
                        <option value="2">Edit</option>
                        <option value="3">Full</option>
                    </select>
                    <button type="submit" className="mt-4 p-2 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg">Save <img src="/save.svg" width={20} height={20} alt="Save icon" className="inline ml-2"/></button>
                </form>
            </div>
            <div className="change-permission__messasge mt-4">
                <DisplayMessage/>
            </div>
        </div>
    )
};

export default ChangePermission;