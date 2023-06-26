"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import style from './login.module.css'

import SuccessMessage from "@/components/Items/SuccessMessage"
import ErrorMessage from "@/components/Items/ErrorMessage"

import { login } from "@/services/authService"

import { setCookie } from "cookies-next"
import { useState } from "react"

const Login = () => {
    const { push } = useRouter();
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [displayMsg, setDisplayMsg] = useState(false);

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
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data) => {
        login(data)
        .then(response => {
            setSuccessMsg(response.data.message);
            setDisplayMsg(true);

            //Set accessToken at cookie
            const accessToken = response.data.data.accessToken;
            const username = response.data.data.username;
            setCookie("token", accessToken, {
                maxAge: 60 * 60 //1h
            });

            setCookie("username", username, {
                maxAge: 60 * 60 * 24
            });
            setTimeout(() => {
                push('/dashboard');
            }, 3000);
        })
        .catch(error => {
            const error_response = error.response;

            setErrorMsg(`Error ${error_response.status}: ${error_response.data.message}`);
            setDisplayMsg(true);

            setTimeout(() => {
                setErrorMsg('');
                setDisplayMsg(false);
            }, 5000);
        });

        
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
                <div className="flex flex-row gap-6">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    <button type="button"  onClick={() => reset()} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset</button>
                </div>
                <div className="pt-4">
                    <DisplayMessage />     
                </div>  
            </form>
        </div>      
    )
}

export default Login