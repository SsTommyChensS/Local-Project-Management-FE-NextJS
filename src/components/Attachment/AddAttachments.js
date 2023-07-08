"use client";

import { useState } from "react";

import { addAttachments } from "@/services/attachmentService";

import SuccessMessage from "../Items/SuccessMessage";
import ErrorMessage from "../Items/ErrorMessage";

const AddAttachments = ({ project }) => {
    const [attachments, setAttachments] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [displayMsg, setDisplayMsg] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        const files = attachments ? [...attachments] : [];
        files.forEach(file => {
            formData.append("attachments", file);
        })

        //Upload avatar
        addAttachments(project._id, formData)
            .then(response => {
                const response_data = response.data;
                setSuccessMsg(`Add attachments at project ${project.title} successfuly!`);
                setDisplayMsg(true);

                setTimeout(() => {
                    setSuccessMsg('');
                    setDisplayMsg(false);
                }, 3000);
            })
            .catch(error => {
                const error_data = error.response.data;
                setErrorMsg(error_data.message);
                setDisplayMsg(true);

                setTimeout(() => {
                    setErrorMsg('');
                    setDisplayMsg(false);
                }, 3000);
            })
    }

    const handleAttachmentsSelect = (e) => {
        setAttachments(e.target.files);
        console.log(attachments);
    }

    //Display message
    const DisplayMessage = () => {
        if(displayMsg && successMsg != '') {
            return  <SuccessMessage message={successMsg} /> 
        } 

        if(displayMsg && errorMsg != '') {
            return <ErrorMessage message={errorMsg} />
        }
    }

    return (
        <div className="add-attachments__form mt-2 pl-2">
            <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm font-medium" htmlFor="attachments">Attachments</label>
                <input onChange={handleAttachmentsSelect} className="block w-2/3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="attachments" name="attachments" type="file" accept="image/png, image/jpeg, image/jpg, application/pdf" multiple/>
                <button type="submit" className="mt-4 p-2 bg-blue-700 text-white hover:bg-blue-900 rounded">Upload</button>
            </form>
            <div className="add-attachments__message mt-4 w-2/3">
                <DisplayMessage/>
            </div>
        </div>
    )
}

export default AddAttachments;