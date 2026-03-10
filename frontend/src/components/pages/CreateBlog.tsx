import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";

interface LoginResponse {
  token: string;
  message: string;
  user: {
    id: number;
    email: string;
  };
}

export function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
const [pubUrl, setPubUrl] = useState<string | null>(null);

  async function handleClick() {
    setIsLoading(true);
    setErrorMessage("");

    try {
        // presign -> S3 -> create
        if(!file == null){
            const presign = await apiClient.post("/blogs/presign", {
                type: file?.type
            });
    
            setPubUrl(presign.data.publicUrl);
            
            const putnUrl = presign.data.putUrl;
            await apiClient.put(putnUrl, {file: file});
        }

        const response = await apiClient.post("/blogs/blogs", {
            title, content, pubUrl
        });

      navigate("/home");
    } catch (error){
        console.log(error);
      setErrorMessage("Blog creating failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Create Blog</h1>

      <input
        type="text"
        placeholder="title"
        onChange={(event) => setTitle(event.target.value)}
        className="w-full rounded border p-2"
      />

      <input
        type="text"
        placeholder="content"
        onChange={(event) => setContent(event.target.value)}
        className="w-full rounded border p-2"
      />

    
      {/* <input
        type="file"
        onChange={(event) => setFile(event?.target.files[0])}
        className="w-full rounded border p-2"
      />
      {console.log(file)} */}

      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer"
      >
        {isLoading ? "Creating..." : "Create"}
      </button>

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </section>
  );
}
