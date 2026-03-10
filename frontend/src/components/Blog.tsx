import { useNavigate } from "react-router-dom";

interface IBlog{
    id: number;
    title: String;
    content: String;
}

export function Blog({id, title, content}: IBlog){
    const navigate = useNavigate();

    function onClickHandler(){
        navigate(`/blog/${id}`);
    }
    
    return (
        <div onClick={onClickHandler} className="border-2">
            <h1>{title}</h1>
            <h1>{content}</h1>
            <br /><br />
        </div>
    )
}