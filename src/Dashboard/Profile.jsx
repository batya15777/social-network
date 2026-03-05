import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Profile.css"

function Profile(){
     const [profileData,setProfileData] = useState(
    { username:"",profileUrl:"",postsCount:0,followersCount:0,followingCount:0}
    );
     const token = Cookies.get("token")
     const [editProfile,setEditProfile] = useState("");
     const [editButton ,setEditButton] = useState(false);
     const [isCreatingPost,setCreatingPos] = useState(false);
     const [newPostsUrl,setNewPostsUrl] = useState("");
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
    const isDisabledByPosts=()=>{
         let disable = false;
         if (newPostsUrl ===null|| newPostsUrl.trim().length ===0){
             disable = true;
         }
         return disable;
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
          loadProfile();
          loadPosts();

        }
    }, [token])



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
    const addPosts=()=>{
        console.log("clicked save button");
        axios.post("http://localhost:8080/add-posts",{
             imageUrl:newPostsUrl
             },{
             headers:{Authorization:token},
             })
             .then(response =>{
                 if (response.data!= null){
                     if (response.data){
                         setPosts(prev=>([...prev,response.data]))
                         loadProfile();
                         setCreatingPos(false)
                         setNewPostsUrl("")
                     }
                 }
              })

    }
    return (
        <div className="profilePage">
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

                    <button className="editBtnBelow" type="button" onClick={editByButton}>
                        Edit profile
                    </button>
                </div>

                {/* RIGHT SIDE */}
                <div className="profileInfo">
                    <div className="profileTopRow">
                        <div className="profileUsername">{profileData.username}</div>

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
                        <span><b>{profileData.followersCount}</b> followers</span>
                        <span><b>{profileData.followingCount}</b> following</span>
                    </div>
                </div>
            </div>

            <div className="divider"></div>

            <div className="postsTabWrap">
                <div className="postsTab">POSTS</div>
            </div>

            {/* EMPTY STATE (רק כשאין פוסטים בכלל) */}
            {posts.length === 0 && (
                <div className="emptyPosts">
                    <div className="noPostsLine">
                        <span className="noPostsIcon"></span>
                        <span className="noPostsText">no posts</span>
                    </div>

                    <h1 className="emptyTitle">Create your first post</h1>
                    <p className="emptySub">Give this space some love.</p>
                </div>
            )}

            {/* POSTS GRID (אינסטגרם: 3 בשורה, ריבוע) */}
            {posts.length > 0 && (
                <div className="postsGrid">
                    {posts.map((p) => (
                        <div className="postTile" key={p.id}>
                            <img className="postImg" src={p.imageUrl} alt="" />
                        </div>
                    ))}
                </div>
            )}

            {/* CREATE FLOATING BUTTON + PANEL */}
            <div className="createDock">
                {isCreatingPost && (
                    <div className="createPanel">
                        <input
                            className="createInput"
                            placeholder="Paste image URL"
                            value={newPostsUrl}
                            onChange={(e) => setNewPostsUrl(e.target.value)}
                        />
                        <button
                            className="createSaveBtn"
                            disabled={isDisabledByPosts()}
                            onClick={addPosts}
                        >
                            Save
                        </button>
                    </div>
                )}

                <button
                    className="createFab"
                    type="button"
                    onClick={() => setCreatingPos((prev) => !prev)}
                    aria-label="Create post"
                >
                    <span className="plusIcon">+</span>
                </button>
            </div>
        </div>
    );
    }

export default Profile;