//url : http://localhost:3000/blog/1

import { apiClient } from "@/lib/axios-instance";
import { useEffect, useState, type SetStateAction } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Blog } from "../Blog";

interface IBlogs {
  id: number;
  title: String;
  content: String;
  author: String;
}


interface IGetBlog {
    id: number
}

export function GetBlog(){
  const { id } = useParams();
  const [blog, setBlog] = useState<IBlogs | null>(null);
    const [isLoading, setIsLoading] = useState(true);

  async function fetch() {
    try {
      const response = await apiClient.get(`/blogs/blogs/${id}`);

    setBlog(response.data);
    setIsLoading(false);
    } catch {
      // setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      // setIsLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []); // whenever a new blog is created, this should be called

  return( 
    <div>
        {isLoading ? "Blog Loading... " : 
        <div>
            <h1>{blog?.author}</h1>
            <h2>{blog?.title}</h2>
            <h2>{blog?.content}</h2>    
        </div>} 
    </div>
  )
}