"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import style from './register.module.css'
import SuccessMessage from "@/components/Items/SuccessMessage"
import ErrorMessage from "@/components/Items/ErrorMessage"

import axios from "axios"
import { signup } from "@/services/authService"


const Register = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [displayMsg, setDisplayMsg] = useState(false);

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
                .trim()
                .required("Fullname is required!")
                .min(6, "Fullname must be from 6 to 20 charaters!")
                .max(20, "Username must be from 6 to 20 charaters!"),
        age: Yup.number()
                .typeError("Age must be a number!")
                .required("Age is required!")
                .min(18, "Age must be from 18 to 100 years old!")
                .max(100, "Age must be from 18 to 100 years old!"),
        phone: Yup.string()
                .required("Phone number is required!")
                .matches(/^[0-9]+$/, "Phone number must be only digits")
                .min(10, "Phone number must be 10 digits!")
                .max(10, "Phone number must be 10 digits!"),
        gender: Yup.number()
                .typeError("Please select gender!")
                .required("Gender is required!"),
        address: Yup.string()
                .required("Address is required!"),
        email: Yup.string()
                .required("Email is required!")
                .email("Invalid email value!"),
        username: Yup.string()
                .required("Username is required!")
                .min(6, "Fullname must be from 6 to 15 charaters!")
                .max(15, "Username must be from 6 to 15 charaters!"),
        password: Yup.string()
                .required("Password is required!")
                .min(6, "Password must be from 6 to 15 charaters!")
                .max(15, "Password must be from 6 to 15 charaters!"),
        password_confirm: Yup.string()
                .required("Password is required!")
                .min(6, "Password must be from 6 to 15 charaters!")
                .max(15, "Password must be from 6 to 15 charaters!")
                .oneOf([Yup.ref("password")], "Password confirm is not the same with password!")
    });
    
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset,formState } = useForm(formOptions);
    const { errors } = formState;

    //Register
    const onSubmit = (data) => {
        signup(data)
            .then(response => {
                setSuccessMsg(response.data.message);
                setDisplayMsg(true);

                setTimeout(() => {
                    setSuccessMsg('');
                    setDisplayMsg(false);
                }, 5000);
            })
            .catch(error => {
                const error_response = error.response;

                setErrorMsg(`Error ${error_response.status}: ${error_response.data.message}`);
                setDisplayMsg(true);

                setTimeout(() => {
                    setErrorMsg('');
                    setDisplayMsg(false);
                }, 5000);
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
        <div className={style.register__section}>
            <h1 className={style.register__title}>Register Form:</h1>        
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register("fullname")} type="text" name="fullname" id="fullname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fullname</label>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.fullname?.message}</p>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input {...register("age")} type="number" name="age" id="age" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                        <label htmlFor="age" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.age?.message}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" {...register("phone")} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+84)</label>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.phone?.message}</p>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Gender</label>
                    <select {...register("gender")} name="gender" defaultValue={'default'} id="gender" className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='default' disabled>Choose a gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                    </select>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.gender?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register("address")} type="text" name="address" id="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.address?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register("email")} type="text" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register("username")} type="text" name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.username?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register("password")} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register("password_confirm")} type="password" name="password_confirm" id="password_confirm" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="password_confirm" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password_confirm?.message}</p>
                </div>
                <div className="flex items-start mb-6">
                    <Link href="login" className={style.register__login_link}>Already have an account? Login here</Link>
                </div>
                <div className="flex flex-row gap-6">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                    <button type="button"  onClick={() => reset()} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset</button>
                </div>          
            </form>
            <div className="pt-8">
                <DisplayMessage/>
            </div>
        </div>
    )
}

export default Register