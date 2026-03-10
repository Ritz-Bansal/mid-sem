// url : http://localhost:3000/signup

import { useState } from "react"
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

export function Signup(){
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

      async function handleClick() {
        setIsLoading(true);
        setErrorMessage("");
    
        try {
          const response = await apiClient.post("/auth/signup", {
            name,
            email,
            password,
          });
    
          navigate("/signin");
        } catch {
          setErrorMessage("Signup failed. Please check your credentials.");
        } finally {
          setIsLoading(false);
        }
      }

     return (
       <section className="mx-auto max-w-md space-y-4">
         <h1 className="text-2xl font-semibold">Sign Up</h1>

         <input
           type="text"
           onChange={(event) => setName(event.target.value)}
           placeholder="Email"
           className="w-full rounded border p-2"
         />

         <input
           type="email"
           onChange={(event) => setEmail(event.target.value)}
           placeholder="Email"
           className="w-full rounded border p-2"
         />

         <input
           type="password"
           onChange={(event) => setPassword(event.target.value)}
           placeholder="Password"
           className="w-full rounded border p-2"
         />

         <button
           type="button"
           onClick={handleClick}
           disabled={isLoading}
           className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer"
         >
           {isLoading ? "Signing up..." : "Signup"}
         </button>

         {errorMessage ? (
           <p className="text-sm text-red-600">{errorMessage}</p>
         ) : null}
       </section>
     );
}