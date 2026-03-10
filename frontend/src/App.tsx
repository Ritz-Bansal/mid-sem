import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./components/pages/Signin";
import { Signup } from "./components/pages/Signup";
import { CreateBlog } from "./components/pages/CreateBlog";
import { Home } from "./components/pages/Home";
import { GetBlog } from "./components/pages/GetBlog";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />

        {/* Enter other Routes in here */}
        <Route path="/signup" element={<Signup />}/>
        {/* should add the protected routes here */}
        {/* <Route element={<Protected />} >  */} 
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blog/:id" element={<GetBlog />} />
          <Route path="/home" element={<Home/>} />
        {/* </Route> */}
        <Route path="*" element={<div className="p-6">Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
