import {useEffect, useState} from "react";
import axios from "axios";
import PostContent from "./PostContent.jsx";
import PostActions from "./PostActions.jsx";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

function PostPage(){
    const  {id} = useParams();
    const [post,setPost] = useState();
    const token = Cookies.get("token")



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

                    <PostActions
                        id={post.id}
                        like={post.like}
                        comment={post.comment}
                        userLiked={post.userLiked}
                    />
                </div>
            )}
        </div>
    );


}
export default PostPage;