import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import "./PostActions.css";


function PostActions({id,like,comment,userLiked}){

    const [likes,setLikes] = useState(like ||0)
    const [isColor,setIsColor] = useState(userLiked)
    const token = Cookies.get("token")



    const handleLikeClick=()=>{
        axios.post("http://localhost:8080/like", {postId:id},{
            headers:{Authorization:token}
        })
            .then((response)=>{
                console.log("clicked like", id)
                if(response.data !== null){
                        setLikes(response.data);
                        setIsColor(prev =>!prev);
                }

                }
            )
    }






    return (
        <div className="postActions">

            <button
                className={isColor ? "likeButton liked" : "likeButton"}
                onClick={handleLikeClick}
            >
                ♥
            </button>

            <span className="likesCount">
            {likes}
        </span>

        </div>
    )
}
export default PostActions;