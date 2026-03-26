import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import UserHeader from "./UserHeader.jsx";
import Post from "../Post/Post.jsx";
import "./UserPage.css"


function UserPage(){
    const  {id} = useParams();
    const token = Cookies.get("token")
    const [dataUser,setDataUser] = useState(null);
    const [posts,setPosts] = useState([])

    const loadUser =()=>{
        axios.get("http://localhost:8080/get-user-page/"+id,{
            headers:{Authorization:token}
        })
            .then(response =>{
                console.log("user data:", response.data);
                console.log("isFollowing:", response.data.isFollowing);

                if (response.data!= null){
                    if (response.data){
                        setDataUser(response.data)
                    }
                }
            })
    }
    const loadPosts =()=>{
        axios.get("http://localhost:8080/get-user-post/" +id,{
            headers:{Authorization:token}
        })
            .then(response =>{
                console.log("post",response.data)
                if (response.data != null){
                    if (response.data){
                        setPosts(response.data)
                    }
                }
            })
    }
    const handleFollowClick =()=>{
      axios.post("http://localhost:8080/followingClick/"+id,{},{
          headers:{Authorization:token}
      })
          .then(response =>{
             if (response.data != null){
                 loadUser();
             }
          })



    }


    useEffect(() => {
        loadUser();
        loadPosts();

    }, [id]);



    return (
        dataUser && (
            <div className="userPage">

                <div className="userTop">

                    <div className="profileLeft">

                        <UserHeader
                            id={id}
                            profileUrl={dataUser.profileUrl}
                            isFollowing={dataUser.following}
                            showButton={true}
                            onFollowClick={handleFollowClick}
                        />



                    </div>

                    <div className="profileRight">

                        <div className="username">
                            {dataUser.username}
                        </div>

                        <div className="userStats">
                            <span><b>{dataUser.postsCount}</b> Posts</span>
                            <span><b>{dataUser.followersCount.length}</b> Followers</span>
                            <span><b>{dataUser.followingCount.length}</b> Following</span>
                        </div>

                    </div>

                </div>

                <div className="postsDivider">
                    <span>POSTS</span>
                </div>

                {posts.length === 0 && (
                    <div className="emptyPosts">

                        <div className="noPostsLine">
                            <span className="noPostsIcon"></span>
                            <span className="noPostsText">no posts</span>
                        </div>
                        

                    </div>
                )}

                {posts.length > 0 && (
                    <div className="postsGrid">
                        {posts.map((p) => (
                            <div className="postTile" key={p.id}>
                                <Post
                                    id={p.id}
                                    date={p.date}
                                    imageUrl={p.image_url}
                                    text={p.content}
                                />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        )
    );
}
export default UserPage;