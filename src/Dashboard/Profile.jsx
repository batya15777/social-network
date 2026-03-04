import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Profile.css"

function Profile(){
     const [profileData,setProfileData] = useState(
    { username:"",profileUrl:"",postsCount:0,followersCount:0,followingCount:0}
    );
     const token = Cookies.get("token")
     const [editProfile,setEditProfile] = useState("")
     const [editButton ,setEditButton] = useState(false)

     const isDisabled=()=>{
         let disable = false;
         if ( editProfile === null||editProfile.trim().length ===0 ){
             disable = true;
         }
         return disable;
    }
     const editByButton=()=>{
         setEditButton(true)
         setEditProfile( profileData.profileUrl)
    }



    useEffect(() => {
        if (token){
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
                         setProfileData(prev=>({
                             ...prev,
                            profileUrl:editProfile
                         }));
                         setEditButton(false)
                         setEditProfile("")
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
                    {/*לא לשכוח לעשות קריאה לפונקציה שתשלח api לצד שרת */}
                    <button className="editBtnBelow" type="button" onClick={editByButton}>
                        Edit profile

                    </button>

                </div>


                {/* RIGHT SIDE */}
                <div className="profileInfo">

                    <div className="profileTopRow">

                        <div className="profileUsername">
                            {profileData.username}
                        </div>

                        {
                            editButton&&

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
                                    disabled={isDisabled()}
                                    onClick={updateProfile}>
                                    Save
                                </button>

                            </div>
                        }

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


            {profileData.postsCount === 0 && (

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

                    <button className="createBtn">
                        Create
                    </button>

                </div>

            )}

        </div>
    );
    }

export default Profile;