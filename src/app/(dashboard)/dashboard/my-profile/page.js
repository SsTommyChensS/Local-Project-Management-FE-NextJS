"use client";

import style from './myprofile.module.css';

import { useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

const sample_data = {
    "status": "Success",
    "message": "Get your profile's information successfully!",
    "data": {
        "avatar": {
            "public_id": "main/storages/users/ava_QTung1999",
            "url": "https://res.cloudinary.com/dbkixopyw/image/upload/v1685509091/main/storages/users/ava_QTung1999.jpg"
        },
        "_id": "64717ff2ba81689549b16eb2",
        "fullname": "Quoc Tung",
        "username": "QTung1999",
        "email": "tranquoctunglun@gmail.com",
        "age": 20,
        "gender": 1,
        "phone": "0357090513",
        "address": "6 I Hung Phu,P9, Q8, TPHCM",
        "code": "9fefbed6",
        "createdAt": "2023-05-27T03:58:42.457Z",
        "updatedAt": "2023-06-09T02:07:30.614Z",
        "__v": 0
    }
};

const MyProfile = () => {
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
        defaultValues: {
            fullname: sample_data.data.fullname,
            username: sample_data.data.username,
            email: sample_data.data.email,
            age: sample_data.data.age,
            gender: sample_data.data.gender,
            phone: sample_data.data.phone,
            address: sample_data.data.address,
            code: sample_data.data.code
        }
    };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (data) => {
        console.table(data);
    };

    const[isDisabled, setisDisabled] = useState(true);

    return (
        <div className="p-4">
            <h1 className={style.myprofile_title}>My Profile</h1>
            <label htmlFor="fullname" className="block mb-4 text-sm font-medium text-gray-900 dark:text-black">Avatar</label>
            <img className="object-cover rounded-full w-40 h-40" src={sample_data.data.avatar.url} alt="My avatar" />
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
                    <button type="button" onClick={() => setisDisabled(!isDisabled)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Update</button>
                    <button type="submit" className="text-white bg-blue-700 disabled:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800" disabled={isDisabled}>Save</button>
                </div>
            </form>
        </div>
    )
};

export default MyProfile;