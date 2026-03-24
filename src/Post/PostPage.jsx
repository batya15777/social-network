import {useEffect, useState} from "react";
import axios from "axios";
import PostContent from "./PostContent.jsx";
import PostActions from "./PostActions.jsx";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import CommentPopUp from "../CommentPopUp.jsx";

function PostPage(){
    const  {id} = useParams();
    const [post,setPost] = useState();
    const token = Cookies.get("token");
    const [open,setOpen] = useState(false);

    const handleOpen =()=>{
        setOpen(true);
    }
    const handleClose =()=>{
        setOpen(false);
    }



    useEffect(() => {
        axios.get("http://localhost:8080/getPost/"+id,{
            headers:{Authorization:token}
        })
            .then((response =>{
                    console.log("post from server:", response.data);
                if (response.data !== null){
                    if (response.data){
                        setPost(response.data)
                    }
                }
             }
            ))
    }, [id]);
    return (
        <div className="postPage">
            {post && (
                <div className="postPageContainer">
                    <PostContent
                        text={post.content}
                        date={post.date}
                        imageUrl={post.image_url}
                    />

                    <PostActions onOpenComments={handleOpen}
                        id={post.id}
                        likes={post.likes}
                        comments={post.comments}
                        userLiked={post.userLiked}
                    />
                    {open &&
                        <CommentPopUp
                            onClose={handleClose}
                            id={post.id}
                        />}
                </div>
            )}
        </div>
    );


}
export default PostPage;