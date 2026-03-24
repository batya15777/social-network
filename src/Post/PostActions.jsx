import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import "./PostActions.css";


function PostActions({id,likes,comments,userLiked,onOpenComments}){

    const [countLikes,setCountLikes] = useState(likes ||0)
    const [isColor,setIsColor] = useState(userLiked)
    const token = Cookies.get("token")


    const handleLikeClick=()=>{
        axios.post("http://localhost:8080/like", {postId:id},{
            headers:{Authorization:token}
        })
            .then((response)=>{
                console.log("clicked like", id)
                if(response.data !== null){
                        setCountLikes(response.data);
                        setIsColor(prev =>!prev);
                }

                }
            )
    }





    return (
        <div className="postActions">

            <div className="actionItem">
                <button
                    className={isColor ? "likeButton liked" : "likeButton"}
                    onClick={handleLikeClick}
                >
                    ♥
                </button>

                <span className="countText">
                {countLikes}
            </span>
            </div>

            <div className="actionItem" onClick={onOpenComments}>
                <button className="commentButton">
                    💬
                </button>

                <span className="countText">
                {comments || 0}
            </span>
            </div>

        </div>
    );
}
export default PostActions;