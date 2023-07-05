"use client";

import { useState, useEffect, forwardRef } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import SuccessMessage from '@/components/Items/SuccessMessage';
import ErrorMessage from '@/components/Items/ErrorMessage';

import { updateProject } from '@/services/projectService';

const DetailProject = ({ project, setOption }, ref) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [displayMsg, setDisplayMsg] = useState(false);
    const [progress, setProgress] = useState(0);
    const validationSchema = Yup.object().shape({
        title: Yup.string()
                .trim()
                .required("Title is required!")
                .min(6, "Title must be from 6 charaters!"),
        description: Yup.string()
                .trim()
                .required("Description is required!")
                .min(6, "Description must be from 6 charaters!"),
        content: Yup.string()
                .trim()
                .required("Content is required")
                .min(10, "Content must be from 6 charaters!"),
        status: Yup.number()
                .typeError("Status must be a number!")
                .required("Status is required!")
                .oneOf([1, 2, 3, 4], "Invalid status value!"),
        progress: Yup.number()
                .typeError("Progress must be a number!")
                .required("Progress is required!")
                .min(0, "Progress must be from 0 to 100!")
                .max(100, "Progress must be from 0 to 100!"),
        start_date: Yup.date()
                .typeError('Invalid start date value!')
                .required("Start date is required!"),
        end_date: Yup.date()
                .typeError('Invalid end date value!')
                .required("End date is required!")
                .when('start_date', start_date => {
                    if (start_date) {
                        return Yup.date()
                            .min(start_date, 'End date must be after start date!')
                            .typeError('End date is required!')
                    }
                })
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    
    //Update project
    const onSubmit = (data) => {
        //Format start_date and end_date
        data.start_date = convertDate(data.start_date);
        data.end_date = convertDate(data.end_date);

        updateProject(project._id, data)
            .then(response => {
                const new_project_info = response.data.data;
                setIsDisabled(true);
                setDisplayMsg(true);
                setSuccessMsg(`Update project ${project.title} successfully!`);

                setTimeout(() => {
                    setDisplayMsg(false);
                    setSuccessMsg('');
                }, 3000);
            })
            .catch(error => {
                console.log(error.response);
                const error_response = error.response;
                const error_message = `Error: ${error_response.data.message}`;
                setDisplayMsg(true);
                setErrorMsg(error_message);

                setTimeout(() => {
                    setDisplayMsg(false);
                    setErrorMsg('');
                }, 3000);
            })
    };

    const handleChangeProgressValue = event => {
        setProgress(event.target.value);
    };

    const handleResetDefault = () => {
        reset();
        setProgress(project.progress);
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
    };

    useEffect(() => {
        setProgress(project.progress);
        reset({ 
            title: project.title,
            description: project.description,
            content: project.content,
            status: project.status,
            progress: project.progress,
            start_date: displayDate(project.start_date),
            end_date: displayDate(project.end_date),
        })
    }, [project]);

    return (
        <div ref={ref} className="update-project-section w-2/3 mt-4 px-4">
            <h1 className="update-project__title p-3 bg-orange-100 text-lime-800 font-serif capitalize tracking-wide italic font-bold text-lg rounded-lg">
                Details of the project <span className="ml-2 text-red-700 underline text-2xl">{project.title}</span>
            </h1>
            <div className="update-project__form mt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input {...register("title")} type="text" name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:bg-gray-100 disabled:opacity-50" placeholder=" " disabled={isDisabled}/>
                        <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.title?.message}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input {...register("description")} type="text" name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:bg-gray-100 disabled:opacity-50" placeholder=" " disabled={isDisabled}/>
                        <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.description?.message}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label htmlFor="content" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Content</label>    
                        <textarea {...register("content")} id="content" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500" placeholder="Write your thoughts here..." disabled={isDisabled}></textarea>
       
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.content?.message}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                        <select {...register("status")} name="status" defaultValue={'default'} id="gender" className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled={isDisabled}>
                            <option value='default' disabled>Choose a status</option>
                            <option value="1">New</option>
                            <option value="2">In Process</option>
                            <option value="3">Done</option>
                            <option value="4">Out Of Date</option>
                        </select>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.gender?.message}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label htmlFor="progress" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Progress: <span className="text-red-500">{progress} %</span></label>
                        <input {...register("progress")} onChange={handleChangeProgressValue} id="progress" type="range" min={0} max={100} step={10} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" disabled={isDisabled}/>       
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.progress?.message}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input {...register("start_date")} type="date" name="start_date" id="start_date" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:bg-gray-100 disabled:opacity-50" placeholder=" " disabled={isDisabled}/>
                        <label htmlFor="status" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start date</label>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.start_date?.message}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input {...register("end_date")} type="date" name="end_date" id="end_date" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:bg-gray-100 disabled:opacity-50" placeholder=" " disabled={isDisabled}/>
                        <label htmlFor="end_date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End date</label>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.end_date?.message}</p>
                    </div>
                    <div className="flex flex-row gap-6">
                        <button type="button"  onClick={() => setIsDisabled(!isDisabled)} className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update <img src="/update.svg" className="inline ml-2 w-3 h-3"/></button>
                        <button type="submit" className="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 enabled:dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400" disabled={isDisabled}>Save <img src="/save.svg" className="inline ml-2 w-3 h-3"/></button>
                        <button type="button"  onClick={handleResetDefault} className="text-white bg-green-700 enabled:hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center enabled:dark:bg-green-600 enabled:dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-400" disabled={isDisabled}>Reset <img src="/reset.svg" className="inline ml-2 w-3 h-3"/></button>
                        <button type="button"  onClick={() => setOption(0)} className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Close <img src="/remove.svg" className="inline ml-2 w-3 h-3"/></button>
                    </div>          
                </form>
                <div className="update-project__message mt-4">
                    <DisplayMessage/>
                </div>
            </div>
        </div>
    )
};

//Convert date time
const displayDate = (data) => {
    let date = new Date(data);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    
    if (month < 10) {
        month = `0${month}`;
    }

    let date_convert = `${year}-${month}-${day}`;
    return date_convert;
};

const convertDate = (data) => {
    let date = new Date(data),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    let result = [date.getFullYear(), mnth, day].join("-");
    
    return result;
}

export default forwardRef(DetailProject);