import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Profile.css"
import Navbar from "../Navbar/Navbar.jsx";
import Post from "../Post/Post.jsx";
import CreatPost from "../Post/CreatPost.jsx";

function Profile(){
     const [profileData,setProfileData] = useState(
    {username:"",profileUrl:"",postsCount:0,followersCount:[],followingCount:[]}
    );
     const token = Cookies.get("token")
     const [editProfile,setEditProfile] = useState("");
     const [editButton ,setEditButton] = useState(false);
     const [posts,setPosts] = useState([]);




     const isDisabledByProfile=()=>{
         let disable = false;
         if ( editProfile === null||editProfile.trim().length === 0 ){
             disable = true;
         }
         return disable;
    }
     const editByButton=()=>{
         setEditButton(true)
         setEditProfile( profileData.profileUrl)
    }


    const loadProfile=()=>{
        axios.get("http://localhost:8080/get-profile",{
            headers: { Authorization: token }
        })
            .then((response =>{
                console.log( "get ",response.data)
                if (response.data!=null){
                    if (response.data){
                        setProfileData(response.data);
                    }
                }
            }
            ))

    }
    const loadPosts=()=>{
        axios.get("http://localhost:8080/get-my-posts",{
            headers: { Authorization: token }

        })
            .then((response=>{
                    if (response.data !=null){
                        if (response.data){
                            setPosts(response.data)
                        }
                    }
                }
            ))
    }


    useEffect(() => {
        if (token){
            refreshProfilePage();

        }
    }, [token])

    const refreshProfilePage = () => {
        loadPosts();
        loadProfile();
    };



    const updateProfile=()=>{
         axios.post("http://localhost:8080/update-profile",{
             profileUrl:editProfile
         },{
             headers:{Authorization:token},
         })
             .then(response =>{
                 if (response.data !=null){
                     if (response.data){
                         setEditButton(false)
                         setEditProfile("")
                     }
                 }
             })
    }
    return (

        <div className="profilePage">

            <Navbar profileImage={profileData.profileUrl}/>

            <div className="profileHeader">

                {/* LEFT SIDE */}
                <div className="avatarCol">
                    <div className="avatarRing">
                        <img
                            className="avatarImg"
                            src={profileData.profileUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt=""
                        />
                    </div>

                    <button
                        className="editBtnBelow"
                        type="button"
                        onClick={editByButton}
                    >
                        Edit profile
                    </button>
                </div>

                <div className="profileInfo">

                    <div className="profileTopRow">

                        <div className="profileUsername">
                            {profileData.username}
                        </div>

                        {editButton && (
                            <div className="editPicRow">

                                <input
                                    className="profileInput"
                                    type="text"
                                    placeholder="Paste image URL"
                                    value={editProfile}
                                    onChange={(e) => setEditProfile(e.target.value)}
                                />

                                <button
                                    className="saveBtn"
                                    type="button"
                                    disabled={isDisabledByProfile()}
                                    onClick={updateProfile}
                                >
                                    Save
                                </button>

                            </div>
                        )}

                    </div>

                    <div className="profileStats">
                        <span><b>{profileData.postsCount}</b> posts</span>
                        <span><b>{profileData.followersCount.length}</b> followers</span>
                        <span><b>{profileData.followingCount.length}</b> following</span>
                    </div>

                </div>

            </div>

            <div className="divider"></div>

            <div className="postsTabWrap">
                <div className="postsTab">POSTS</div>
            </div>


            {posts.length === 0 && (
                <div className="emptyPosts">

                    <div className="noPostsLine">
                        <span className="noPostsIcon"></span>
                        <span className="noPostsText">no posts</span>
                    </div>

                    <h1 className="emptyTitle">
                        Create your first post
                    </h1>

                    <p className="emptySub">
                        Give this space some love.
                    </p>

                </div>
            )}


            {posts.length > 0 && (
                <div className="postsGrid">

                    {posts.map((p) => {
                        return (
                            <div className="postTile" key={p.id}>
                                <Post
                                    id={p.id}
                                    date={p.date}
                                    imageUrl={p.image_url}
                                    text={p.content}

                                />
                            </div>
                        )
                    })}

                </div>
            )}


            <CreatPost onPostAdd={refreshProfilePage}/>

        </div>
    );
    }

export default Profile;