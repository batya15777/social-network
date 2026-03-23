import {useNavigate} from "react-router-dom";

function UserHeader({id,username, profileUrl,isFollowing = false,showButton = false}){

    const hasImage = profileUrl && profileUrl.trim() !== "";
    const navbar = useNavigate();

    const navigateUserProfile =()=>{
        navbar("/user-page/"+id);
    }
    return (
        <div className="userHeader" onClick={navigateUserProfile}>

            {hasImage ? (
                <img
                    src={profileUrl}
                    className="profileImage"
                    alt=""
                />
            ) : (
                <div className="defaultProfile"></div>
            )}

            {username && (
                <span className="username">
                {username}
            </span>
            )}

            {showButton && (
                <button
                    className="followButton"
                    onClick={(e) => e.stopPropagation()}
                >
                    {isFollowing ? "Following" : "Follow"}
                </button>
            )}

        </div>
    );
}

export default UserHeader;