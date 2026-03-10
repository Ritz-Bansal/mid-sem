//url : http://localhost:3000/

import { apiClient } from "@/lib/axios-instance";
import { useEffect, useState } from "react";
import { Blog } from "../Blog";
import { useNavigate } from "react-router-dom";


interface IBlogs {
    id: number;
    title: String;
    content: String;
}


export function Home(){
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<IBlogs[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    async function fetch(){
        try {
            const response = await apiClient.get("/blogs/blogs");
            setBlogs(response.data.blogs);
            setIsLoading(false);

        } catch {
            // setErrorMessage("Login failed. Please check your credentials.");
        } finally {
            // setIsLoading(false);
        }
    }

    useEffect(()=> {
        fetch();
    }, []) // whenever a new blog is created, this should be called
    
    return (
        <div>
            <div>
         <button
           type="button"
           onClick={() => {navigate("/create")}}
        //    disabled={isLoading}
           className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer"
         > Create</button>
            </div>
            <div>
                {isLoading ? "Loading blogs..." : 
                blogs.map((blog) => 
                <Blog id={blog.id} title={blog.title} content={blog.content} />
                )}
            </div>
        </div>
    )
}