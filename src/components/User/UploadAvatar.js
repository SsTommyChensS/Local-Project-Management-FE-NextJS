"use client"

import { useState } from "react"

import { uploadAvatar } from "@/services/userService";

import SuccessMessage from "../Items/SuccessMessage";
import ErrorMessage from "../Items/ErrorMessage";

const UploadAvatar = () => {
    const [avatar, setAvatar] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [displayMsg, setDisplayMsg] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("avatar", avatar);
        //Upload avatar
        uploadAvatar(formData)
            .then(response => {
                const response_data = response.data;
                setSuccessMsg(response_data.message);
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

    const handleAvatarSelect = (e) => {
        setAvatar(e.target.files[0]);
    };

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
        <div className="upload-avatar-section mt-6">
            <h1 className="font-serif font-bold text-4xl">Upload Avatar</h1>
            <div className="upload-avatar__form mt-4">
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium" htmlFor="avatar">Avatar</label>
                    <input onChange={handleAvatarSelect} className="block w-2/3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="avatar" name="avatar" type="file" accept="image/png, image/jpeg, image/jpg"/>
                    <button type="submit" className="mt-4 p-3 bg-blue-700 text-white hover:bg-blue-900 rounded">Upload</button>
                </form>
            </div>
            <div className="upload-avatar__message mt-4 w-2/3">
                <DisplayMessage/>
            </div>
        </div>
    )
}

export default UploadAvatar