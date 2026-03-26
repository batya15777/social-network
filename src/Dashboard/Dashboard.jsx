// import {useEffect, useState} from "react";
// import axios, {get} from "axios";
// import Cookies from "js-cookie";



import Navbar from "../Navbar/Navbar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Post from "../Post/Post.jsx";

function Dashboard (){
    const[posts,setPosts]=useState([]);

    useEffect(()=> {
        const token  = Cookies.get("token");
        axios.get("http://localhost:8080/feed",{
            headers: {Authorization: token}
        }).then(response=>{
            if (response.data!==null){
                setPosts(response.data);
                console.log(response.data)
            }
        })
    },[])


    return(
        <div>
            <Navbar/>
            <h1>Feed</h1>
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
        </div>
    );
}




export default Dashboard;