"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import ErrorMessage from "../Items/ErrorMessage";
import SuccessMessage from "../Items/SuccessMessage";

import { inviteUserToProject } from "@/services/memberService";

const InviteUser = ({ project, setOpenInviteUser }) => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [displayMsg, setDisplayMsg] = useState(false);
    
    const validationSchema = Yup.object().shape({
        user_code: Yup.string()
                .required("Username is required!")
                .min(8, "User code must be 8 charaters")
                .max(8, "User code must be 8 charaters"),
        permission: Yup.number()
                .typeError("Please select permission!")
                .required("Permission is required!"),
    });

    const formOptions = { resolver: yupResolver(validationSchema)};
    const { register, handleSubmit, formState, reset } = useForm(formOptions);
    const { errors } = formState;

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

    const onSubmit = (data) => {
        const project_id = project._id;
        inviteUserToProject(project_id, data)
            .then(response => {
                const response_data = response.data;

                setSuccessMsg(response_data.message);
                setDisplayMsg(true);

                setTimeout(() => {
                    setSuccessMsg('');
                    setDisplayMsg(false);
                }, 2000)
            })
            .catch(error => {
                const error_response = error.response;
                setErrorMsg(error_response.data.message);
                setDisplayMsg(true);

                setTimeout(() => {
                    setErrorMsg('');
                    setDisplayMsg(false);
                }, 2000)
            })
    };

    return (
        <div className="invite-user-section mt-2 w-2/3">
            <div className="invite-user__heading bg-lime-300 text-green-800 p-4 rounded-lg  flex justify-between gap-x-10">
                <h1 className="capitalize">Invite user for project <span className="text-red-600 text-xl font-bold">{project.title}</span></h1>
                <button onClick={() => setOpenInviteUser(false)}>
                    <img src="/cancel.svg" width={30} height={30} alt="Cancel icon"/>
                </button>
            </div>
            <div className="invite-user__form mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input  {...register("user_code")} type="text" name="user_code" id="user_code" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                        <label htmlFor="user_code" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Code</label>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.user_code?.message}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label htmlFor="permission" className="text-gray-500">Permission</label>
                        <select {...register("permission")} name="permission" id="permission" className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200">
                            <option value='default' disabled>Choose a gender</option>
                            <option value="1">View</option>
                            <option value="2">Edit</option>
                            <option value="3">Full</option>
                        </select>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.permission?.message}</p>
                    </div>
                    <div className="flex flex-row gap-6">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Invite</button>
                        <button type="button"  onClick={() => reset()} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset</button>
                    </div>
                    <div className="pt-4">
                        <DisplayMessage />     
                    </div>  
                </form>
            </div>
        </div>
    )
};

export default InviteUser;