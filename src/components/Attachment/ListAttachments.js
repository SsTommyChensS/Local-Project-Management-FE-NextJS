"use client";

import { useState, useEffect, forwardRef } from 'react';
import { getAttachments, removeAttachment } from '@/services/attachmentService';

import Pagination from '../Pagination/Pagination';
import TitleHeading from '../Items/TitleHeading';

const ListAttachments = ({ project, setOption }, ref) => {
    const [attachments, setAttachments] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    //Get attachments by project
    const handleGetAttachments = (currentPage) => {
        getAttachments(project._id, currentPage)
            .then(response => {
                const response_data = response.data;
                const items = response_data.data;
                const totalItems = response_data.totalItems;
                const itemsEachPage = response_data.itemsEachPage;
                //Count total pages 
                const pages = Math.ceil(totalItems / itemsEachPage);
                setAttachments(items);
                setTotalPage(pages);
            })
            .catch(error => {
                console.log(error.response);
            })
        }; 
    //Remove attachment
    const handleRemoveAttachment = (attachment) => {
        const attachment_id = attachment._id;
        const attachment_name =  `${displayFileName(attachment.name)}.${attachment.type}`;
        if(confirm(`Are you sure to remove this attachment: ${attachment_name}`)) {
            removeAttachment(attachment_id)
                .then(response => {
                    alert(`You have removed attachment: ${attachment_name} successfully!`);
                    //Get projects after remove
                    setCurrentPage(1);
                    handleGetAttachments(currentPage);
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
    }

    //Display button
    const displayButton = (attachment) => {
        return (
            <>
                <button onClick={() => handleRemoveAttachment(attachment)} className="bg-red-700 hover:bg-red-800 text-white p-2 rounded-lg w-max flex items-center gap-1">Remove <img src="/remove.svg" className="inline ml-2 h-3"/></button>
            </>
        )
    };

    //List attachments
    const list_attachments = attachments.map((attachment, index) => {
        return (
            <tr key={attachment._id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4">{index+1}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {displayFileName(attachment.name)}
                </th>
                <td className="px-6 py-4">{attachment.type}</td>
                <td className="px-6 py-4">{displayFizeSize(attachment.size)}</td>
                <td className="px-6 py-4">{displayDate(attachment.uploadAt)}</td>
                <td className="px-6 py-4">
                    <a href={attachment.url}><span className="text-blue-500 underline">{displayFileName(attachment.name)+'.'+attachment.type}</span></a>
                </td>
                <td className="px-6 py-4">{displayButton(attachment)}</td>
            </tr>
        )
    });

    useEffect(() => {
        handleGetAttachments(currentPage);
    }, [project]);

    return (
        <div ref={ref} className="list-attachments-section w-4/5 mt-4 px-4">
            <TitleHeading titleMessage="All attachments at project" item={project.title} setOption={setOption}/>       
            <div className="list-attachments__table mt-4 relative shadow-md overflow-x-auto">
                <table className="table-auto text-sm text-left text-gray-500 bg-gray-500 w-full">
                        <thead className="text-xs text-white uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">No</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Size</th>
                                <th scope="col" className="px-6 py-3">Upload At</th>
                                <th scope="col" className="px-6 py-3">Link</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_attachments}
                        </tbody>
                </table>
            </div>
            {
                attachments.length != 0 && 
                <Pagination totalPage={totalPage} setPage={setCurrentPage} currentPage={currentPage} />
            }
        </div>
    )
}

//Display file name
const displayFileName = (data) => {
    return data.slice(25);
}

//Convert date time
const displayDate = (data) => {
    let date = new Date(data);
    let date_convert = date.toLocaleDateString();
    return date_convert;
};

//Convert fize size
const displayFizeSize = (data) => {
    return data >= 1000 ? `${(data / 1000).toFixed(2)} MB` : `${data.toFixed(2)} KB`;
}

export default forwardRef(ListAttachments);