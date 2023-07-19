"use client";

import style from './myprofile.module.css';

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import { getYourProfile, updateProfile } from '@/services/userService';

import UploadAvatar from '@/components/User/UploadAvatar';
import SuccessMessage from '@/components/Items/SuccessMessage';
import ErrorMessage from '@/components/Items/ErrorMessage';

const MyProfile = () => {
    const [isDisabled, setisDisabled] = useState(true);
    const [displayMsg, setDisplayMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [avatar, setAvatar] = useState({});
    const [userData, setUserData] = useState({});
    const [displayUploadAvatar, setDisplayUploadAvatar] = useState(false);

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
                .trim()
                .required("Fullname is required!")
                .min(6, "Fullname must be from 6 to 20 charaters!")
                .max(20, "Username must be from 6 to 20 charaters!"),
        username: Yup.string()
                .trim()
                .required("Username is required!")
                .min(6, "Fullname must be from 6 to 15 charaters!")
                .max(15, "Username must be from 6 to 15 charaters!"),
        email: Yup.string()
                .trim()
                .required("Email is required")
                .email("Invalid email value!"),
        age: Yup.number()
                .typeError("Age must be a number!")
                .required("Age is required!")
                .min(18, "Age must be from 18 to 100 years old!")
                .max(100, "Age must be from 18 to 100 years old!"),
        gender: Yup.number()
                .typeError("Please select gender!")
                .required("Gender is required!"),
        phone: Yup.string()
                .required("Phone number is required!")
                .matches(/^[0-9]+$/, "Phone number must be only digits")
                .min(10, "Phone number must be 10 digits!")
                .max(10, "Phone number must be 10 digits!"),
        address: Yup.string()
                .required("Address is required!"),
        code: Yup.string()
                .required("Code is required!")
    });

    const formOptions = { 
        resolver: yupResolver(validationSchema),
    };
    const { register, handleSubmit, formState, reset } = useForm(formOptions);
    const { errors } = formState;

    useEffect(() => {
        getYourProfile()
            .then(response => {
                const user_info = response.data.data;
                setUserData(user_info);
                setAvatar(user_info.avatar);
                reset({ 
                        fullname: user_info.fullname,
                        username: user_info.username,
                        email: user_info.email,
                        age: user_info.age,
                        gender: user_info.gender,
                        phone: user_info.phone,
                        address: user_info.address,
                        code: user_info.code
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    //Upload avatar
    const handleDisplayUploadAvatar = () => {
        setDisplayUploadAvatar(!displayUploadAvatar);
    };
    //Update profile
    const onSubmit = (data) => {
        updateProfile(userData._id, data)
            .then(response => {
                const new_user_info = response.data.data;
                setUserData(new_user_info);
                setAvatar(new_user_info.avatar);

                setisDisabled(true);
                setDisplayMsg(true);
                setSuccessMsg('Update your profile successfully!');

                setTimeout(() => {
                    setDisplayMsg(false);
                    setSuccessMsg('');
                }, 3000);
            })
            .catch(error => {
                const error_response = error.response;
                const error_message = error_response.data.message;

                setDisplayMsg(true);
                setErrorMsg(error_message);

                setTimeout(() => {
                    setDisplayMsg(false);
                    setErrorMsg('');
                }, 3000);
            })
    };

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

    return (
            <div className="my-profile-section p-4">
                <h1 className={style.myprofile_title}>My Profile</h1>
                <label htmlFor="fullname" className="block mb-4 text-sm font-medium text-gray-900 dark:text-black">Avatar</label>
                <img className="object-cover rounded-full w-40 h-40" src={displayAvatar(avatar)} alt="My avatar" />
                <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
                    <div className="mb-6 w-2/3">
                        <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Fullname</label>
                        <input {...register("fullname")} type="text" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disable:bg-green-200 disabled:border-slate-200" disabled={isDisabled}/>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.fullname?.message}</p>
                    </div>
                    <div className="mb-6 w-2/3">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Username</label>
                        <input {...register("username")} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200" disabled={isDisabled}/>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.username?.message}</p>
                    </div>
                    <div className="mb-6 w-2/3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email</label>
                        <input {...register("email")} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200" disabled/>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email?.message}</p>
                    </div>
                    <div className="mb-6 w-1/4">
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Age</label>
                        <input {...register("age")} type="number" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200" disabled={isDisabled}/>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.age?.message}</p>
                    </div>
                    <div className="mb-6 w-1/4">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Gender</label>
                        <select {...register("gender")} name="gender" id="gender" className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200" disabled={isDisabled}>
                            <option value='default' disabled>Choose a gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Other</option>
                        </select>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.gender?.message}</p>
                    </div>
                    <div className="mb-6 w-2/4">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Phone number</label>
                        <input {...register("phone")} type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200" disabled={isDisabled}/>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.phone?.message}</p>
                    </div>
                    <div className="mb-6 w-2/3">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Address</label>    
                        <input {...register("address")} type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200" disabled={isDisabled}/>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.address?.message}</p>
                    </div>
                    <div className="mb-6 w-1/4">
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Code</label>
                        <input {...register("code")} type="text" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200" disabled/>
                    </div>
                    <div className="flex flex-row gap-6">
                        <button type="button" onClick={() => setisDisabled(!isDisabled)} className="p-2 text-white text-sm bg-yellow-400 hover:bg-yellow-500 rounded-lg">
                            Update <img src="/update.svg" className="inline ml-2 w-4 h-4"/>
                        </button>
                        <button type="submit" className="text-white text-sm bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg p-2 text-center dark:bg-blue-600 dark:focus:ring-blue-800" disabled={isDisabled}>
                            Save  <img src="/save.svg" className="inline ml-2 w-4 h-4"/>
                        </button>
                        <button type="button" onClick={handleDisplayUploadAvatar} className="text-white bg-green-700 disabled:bg-gray-300 hover:bg-green-800 rounded-lg px-5 py-2.5" disabled={isDisabled}>
                            Upload Avatar <img src="/upload_avatar.svg" className="inline ml-2 w-5 h-5"/>
                        </button>
                    </div>
                </form>
                {
                    displayMsg && (
                        <div className="mt-4">
                            <DisplayMessage />
                        </div>
                    )
                }
                { displayUploadAvatar && <UploadAvatar />}
            </div>          
    )
};

//Display avatar 
const displayAvatar = (avatar) => {
    let url;
    if(avatar.url == "") {
        url ="/anonymous_avatar.jpg";
    } else {
        url = avatar.url;
    }

    return url;
}

export default MyProfile;