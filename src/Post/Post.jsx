import "./Post.css";
import PostContent from "./PostContent.jsx";
import PostActions from "./PostActions.jsx";
import {useNavigate} from "react-router-dom";

 function Post({ id, text, date, imageUrl }) {
        const navigate = useNavigate()

        const openPost =()=>{
            navigate("/post-page/"+ id)
        }

        return (
            <div className="postContainer" onClick={openPost}>
                <PostContent id={id} text={text} date={date} imageUrl={imageUrl}/>

            </div>
        );

}

export default Post;