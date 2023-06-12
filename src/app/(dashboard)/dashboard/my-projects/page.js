import style from './myprojects.module.css'

const data_sample = {
    "status": "Success",
    "message": "Get my projects successfully!",
    "data": [
        {
            "_id": "6472b9d240f6e4b5a823b669",
            "title": "My Project 1",
            "description": "This my project 1 using ExpressJS and MongoDB",
            "content": "<p>Hello everyone! This is my first project with Express and MongoDB</p>",
            "status": 4,
            "progress": 10,
            "start_date": "2023-05-16T00:00:00.000Z",
            "end_date": "2023-05-28T00:00:00.000Z",
            "createdAt": "2023-05-28T02:17:54.242Z",
            "updatedAt": "2023-06-03T08:24:12.828Z",
            "__v": 0
        },
        {
            "_id": "64747c661717e667514371d5",
            "title": "My Project 2",
            "description": "This my project 1 using PHP and MySQL",
            "content": "<p>Hello everyone! This is my first project with Express and PHP and MySQL</p>",
            "status": 2,
            "progress": 10,
            "start_date": "2023-05-29T00:00:00.000Z",
            "end_date": "2023-06-28T00:00:00.000Z",
            "createdAt": "2023-05-29T10:20:22.061Z",
            "updatedAt": "2023-06-03T08:40:40.622Z",
            "__v": 0
        }
    ]
};

//Display status
const displayStatus = (status) => {
    switch(status){
        case 1: { return (
            <span className="text-green-300 font-bold">New</span>
        )}
        case 2: { return (
            <span className="text-yellow-300 font-bold">In Progress</span>
        )}
        case 3: { return (
            <span className="text-blue-300 font-bold">Done</span>
        )}
        case 4: { return (
            <span className="text-red-600 font-bold">Out of date</span>
        )}
    }
}

//Convert date time
const displayDate = (data) => {
    let date = new Date(data);
    let date_convert = date.toLocaleDateString();
    return date_convert;
}

const MyProjects = () => {
    const list_projects = data_sample.data.map((project, index) => {
        return (
            <tr key={project._id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4">{index+1}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {project.title}
                </th>
                <td className="px-6 py-4">{project.description}</td>
                <td className="px-6 py-4">{project.content}</td>
                <td className="px-6 py-4">{displayStatus(project.status)}</td>
                <td className="px-6 py-4">{project.progress + ' %'}</td>
                <td className="px-6 py-4">{displayDate(project.start_date)}</td>
                <td className="px-6 py-4">{displayDate(project.end_date)}</td>
                <td className="px-6 py-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <button className="bg-yellow-700 text-white p-2 rounded-lg">Update</button>
                    <button className="bg-red-700 text-white p-2 rounded-lg">Remove</button>
                    <button className="bg-pink-700 text-white p-2 rounded-lg">Members</button>
                    <button className="bg-green-700 text-white p-2 rounded-lg">Tasks</button>
                    <button className="bg-red-400 text-white p-2 rounded-lg">Comments</button>
                </td>
            </tr>
        )
    });

    return (
        <div className="p-4 relative shadow-md overflow-x-auto">
            <h1 className={style.myprojects__title}>My Projects</h1>
            <div className={style.myprojects__search_filter}>
                <div className="myproject__search_filter__title w-80">
                    <label htmlFor="search_title">Title:</label>
                    <div className="search_title__input flex">
                        <input type="text" id="search_title" name="search_title" className="bg-gray-700 text-white w-full p-2.5 rounded-md" placeholder="Type here"/>
                        <button className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
                <div className="myproject__search_filter__status">
                    <label htmlFor="search_status">Status:</label>
                    <select name="search_status" id="search_status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='default' disabled>Choose a status</option>
                        <option value="1">New</option>
                        <option value="2">In Progress</option>
                        <option value="3">Done</option>
                        <option value="4">Out of date</option>
                    </select>
                </div>
            </div>
            <table className="table-auto text-sm text-left text-gray-500 bg-gray-500 overflow-x-scroll w-full">
                <thead className="text-xs text-white uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Content
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Progress
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Start Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            End Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list_projects}
                </tbody>
            </table>
        </div>
    )
};

export default MyProjects;