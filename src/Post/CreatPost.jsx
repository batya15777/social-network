import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./CreatPost.css"



function CreatPost({onPostAdd}){
    const [creatingPost,setCreatingPost] = useState(false);
    const [newPostsUrl,setNewPostsUrl] = useState("");
    const [newPostsText,setNewPostsText] = useState("");
    const token = Cookies.get("token")



    const isDisabledByPostsUrl=()=>{
        let disable = false;
        if ((newPostsUrl ===null|| newPostsUrl.trim().length ===0) && (newPostsText ===null || newPostsText.trim().length===0)){
            disable = true;
        }
        return disable;
    }


    const addPosts=()=>{
        console.log("clicked save button");
        axios.post("http://localhost:8080/add-posts",{
            imageUrl:newPostsUrl,
            content:newPostsText
        },{
            headers:{Authorization:token},
        })
            .then(response =>{
                if (response.data!= null){
                    if (response.data){
                        onPostAdd()
                        setCreatingPost(false)
                        setNewPostsUrl("")
                        setNewPostsText("")
                    }
                }
            })

    }




    return(



        <div className="createDock">
            {creatingPost  && (
                <div className="createPanel">
                    <input
                        className="createInput"
                        placeholder="Paste image URL"
                        value={newPostsUrl}
                        onChange={(e) => setNewPostsUrl(e.target.value)}
                    />
                    <input
                        className="createInput"
                        placeholder="Write post text"
                        value={newPostsText}
                        onChange={(e) => setNewPostsText(e.target.value)}
                    />
                    <button
                        className="createSaveBtn"
                        disabled={isDisabledByPostsUrl()}
                        onClick={addPosts}
                    >
                        Save
                    </button>
                </div>
            )}

            <button
                className="createFab"
                type="button"
                onClick={() => setCreatingPost(prev =>!prev)}
            >
                <span className="plusIcon">+</span>
            </button>
        </div>









    )


}
export default CreatPost;