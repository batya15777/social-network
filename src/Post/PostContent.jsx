import "./PostContent.css";
import {useNavigate} from "react-router-dom";
function PostContent( {id,text, date, imageUrl}){





    return (
        <div className="post">

            {imageUrl && (
                <img
                    className="postImg"
                    src={imageUrl}
                    alt=""
                />
            )}

            {text && (
                <div className="postTextWrapper">
                    <p className="postText">{text}</p>
                </div>
            )}

        </div>
    );
}
export default PostContent;