import { useRouter  } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";


const AddProject = () => {  
    const { push } = useRouter();
    return (
        <div className="project_add">
            <h1>Add Project</h1>
            <button onClick={() => setCookie('test', 'value', { maxAge: 5 })}className="bg-pink-700 hover:bg-pink-800 text-white p-2 rounded-lg w-full">Members</button>
            <button onClick={() => alert(getCookie('test'))}className="bg-pink-700 hover:bg-pink-800 text-white p-2 rounded-lg w-full">Get</button>
        </div>
    )
};

export default AddProject;