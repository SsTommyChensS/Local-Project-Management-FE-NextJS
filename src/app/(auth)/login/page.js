"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import axios from "axios"

import style from './login.module.css'

import SuccessMessage from "@/components/Items/SuccessMessage"
import ErrorMessage from "@/components/Items/ErrorMessage"
import { useEffect, useState } from "react"


const Login = () => {
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('hello');

    const validationSchema = Yup.object().shape({
        username: Yup.string()
                .required("Username is required!")
                .min(6, "Username must be from 6 to 15 charaters!")
                .max(15, "Username must be from 6 to 15 charaters!"),
        password: Yup.string()
                .required("Password is required!")
                .min(6, "Username must be from 6 to 15 charaters!")
                .max(15, "Username must be from 6 to 15 charaters!")
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", data);
            setSuccessMsg(response.message);
            console.log(response);
        } catch (err) {
            const data_error = err.response.data;
            console.log(data_error.message);
            setErrorMsg(data_error.message);
        }
    };

    return (
        <div className={style.login__section}>
            <h1 className={style.login__title}>Login Form:</h1>        
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative z-0 w-full mb-6 group">
                    <input  {...register("username")} type="text" name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                    <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.username?.message}</p>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input  {...register("password")} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password?.message}</p>
                </div>
                <div className="flex items-start mb-6">
                    <Link href="register" className={style.login__register_link}>Don't have account? Register here</Link>
                </div>
                {
                    success && (
                        <SuccessMessage message="Success!"/>
                    )
                }          
                <ErrorMessage message="Error!"/>
                <div className="flex flex-row gap-6">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    <button type="reset" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset</button>
                </div>  
            </form>
        </div>
    )
}

export default Login