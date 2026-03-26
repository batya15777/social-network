import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./CommentPopUp.css";

function CommentPopUp({id,onClose}) {
    const token = Cookies.get("token");
    const [comments,setComments]=useState([

    ]);
    const [newComments ,setNewComments]=useState("");


    const disableButton=()=>{
        let disable = false;
        if (newComments === null || newComments.trim().length === 0){
            disable = true;
        }
        return disable;
    }



    const addCommentByUser =()=>{
        axios.post("http://localhost:8080/addComment",{postId:id,content:newComments},{
            headers: {Authorization:token}
        }).then(response=>{
            getComments();
            setNewComments("")


        })

    }
    const getComments =()=>{
        axios.get("http://localhost:8080/getComments/"+id,{
            headers:{Authorization:token}
        }).then(response=> {
            if (response.data!=null){
                if (response.data){
                    setComments(response.data);
                }
            }
        })
    }
    useEffect(() => {
        getComments()   ;
    }, []);


    return (
        <div className="popupOverlay">
            <div className="popupContainer">

                <button className="closeButton" onClick={onClose}>×</button>

                <div className="commentsList">
                    {comments.map((comment, index) => {
                        return (
                            <div key={index} className="commentItem">

                                <img
                                    src={
                                        comment.profileUrl && comment.profileUrl.trim().length > 0
                                            ? comment.profileUrl
                                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    }                                    alt="profile"
                                    className="commentProfileImg"
                                />

                                <div className="commentContent">
                                <span className="commentUsername">
                                    {comment.username}
                                </span>

                                    <p className="commentText">
                                        {comment.content}
                                    </p>
                                </div>

                            </div>
                        )
                    })}
                </div>

                <div className="addCommentSection">
                    <input
                        value={newComments}
                        placeholder="What do you think of this"
                        onChange={(e) => setNewComments(e.target.value)}
                    />

                    <button
                        className="sendButton"
                        disabled={disableButton()}
                        onClick={addCommentByUser}
                    >
                        <svg
                            className="sendIcon"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 19V5M12 5L6 11M12 5L18 11"
                            />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    );


}
export default CommentPopUp;