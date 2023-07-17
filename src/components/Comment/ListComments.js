"use client";

import { useState, useEffect, forwardRef} from "react";

import { getComments } from "@/services/commentService";

import PostComment from "./PostComment";

import TitleHeading from "../Items/TitleHeading";
import Pagination from "../Pagination/Pagination";
import ErrorMessage from "../Items/ErrorMessage";

const ListComments = ({ project, setOption }, ref) => {
    const [comments, setComments] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    
    //Get comments by project
    const handleGetComments = () => {
        getComments(project._id, currentPage)
            .then(response => {
                const response_data = response.data;
                const items = response_data.data;
                const totalItems = response_data.totalItems;
                const itemsEachPage = response_data.itemsEachPage;
                //Count total pages 
                const pages = Math.ceil(totalItems / itemsEachPage);
                setComments(items);
                setTotalPage(pages);
            })
            .catch(error => {
                console.log(error.response);
            })
    }; 

    const list_comments = comments.map((comment, index) => {
        if(index % 2 == 0) {
            return (
                <div key={comment._id} className="list-comment__message bg-blue-100 border-t border-b border-blue-500 px-4 py-3 mb-2">
                    <h2 className="text-blue-700 font-bold italic">{comment.user.fullname} --</h2>
                    <p className="text-orange-600">{comment.content}</p>
                    <p className="text-gray-400">{displayDate(comment.commentAt)}</p>
                </div>
            )
        } else {
            return (
                <div key={comment._id} className="list-comment__message bg-green-100 border-t border-b border-green-500 px-4 py-3 mb-2 text-right">
                    <h2 className="text-green-700 font-bold italic">-- {comment.user.fullname}</h2>
                    <p className="text-orange-600">{comment.content}</p>
                    <p className="text-gray-400">{displayDate(comment.commentAt)}</p>
                </div>
            )
        }      
    });

    useEffect(() => {
        handleGetComments();
    }, [project, currentPage])

    return (
        <div ref={ref} className="list-comments-section w-4/5 mt-4 px-4">
            <TitleHeading titleMessage="All comments at project" item={project.title} setOption={setOption}/>
            <div className="list-comments__items mt-4">
                {list_comments}
            </div>
            {
                comments.length != 0  
                ? <Pagination totalPage={totalPage} setPage={setCurrentPage} currentPage={currentPage} />
                : <ErrorMessage message="There aren't any comments!"/>
            }
            <PostComment project={project}/>
        </div>
        
    )
}

//Convert date time
const displayDate = (data) => {
    let date = new Date(data);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let date_convert = `${date.toLocaleDateString()} ${hour}:${minute}:${second}`;
    return date_convert;
};

export default forwardRef(ListComments);