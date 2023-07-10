"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { postComment } from "@/services/commentService";

import ErrorMessage from "../Items/ErrorMessage";
import SuccessMessage from "../Items/SuccessMessage";

const PostComment = ({ project }) => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [displayMsg, setDisplayMsg] = useState(false);

    const validationSchema = Yup.object().shape({
        content: Yup.string()
            .required("Comment is required!")
            .min(3, "Comment must be from 3 charaters!")
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    
    const onSubmit = (data) => {
        postComment(project._id, data)
            .then(response => {
                const response_data = response.data;
                setSuccessMsg(`Comment at project ${project.title} successfully!`);
                setDisplayMsg(true);

                setTimeout(() => {
                    setSuccessMsg('');
                    setDisplayMsg(false);
                }, 3000);
            })
            .catch(error => {
                setErrorMsg('Cannot comment!');
                setDisplayMsg(true);

                setTimeout(() => {
                    setErrorMsg('');
                    setDisplayMsg(false);
                }, 3000);
            })
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
        <div className="post-comment-section ml-2">
            <form className="pt-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Comment</label>
                    <textarea {...register("content")} id="comment" rows={10} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your comment here..."></textarea>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.content?.message}</p>
                </div>
                <div className="flex flex-row gap-6">
                    <button type="submit" className="hover:bg-amber-200 bg-amber-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Comment  <img src="/post_comment.svg" className="inline ml-2 w-5 h-5"/>
                    </button>
                </div>
            </form>
            <div className="post-comment__message mt-4">
                <DisplayMessage/>
            </div>
        </div>
    )
};

export default PostComment;