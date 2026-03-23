import {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar.jsx";
import UserHeader from "../Dashboard/UserHeader.jsx";
import "./Search.css"

function Search(){

const [users,setUsers] = useState([])
const [search,setSearch] = useState("");
const searchUser = users.filter(user =>user.username.includes(search))


    useEffect(() => {
        axios.get("http://localhost:8080/get-all-username")
            .then(response=>{
                if (response.data!= null){
                    if (response.data){
                        setUsers(response.data)
                        console.log(response.data)
                    }
                }
            })
    }, []);


    return (
        <>
            <Navbar/>

            <div className="searchContainer">

                <input
                    className="searchInput"
                    placeholder="Search users..."
                    type="text"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

                {search !== "" && (

                    <div className="resultsBox">

                        {searchUser.map(user => {

                            return(

                                <div className="searchResult">

                                    <UserHeader
                                        id={user.id}
                                        username={user.username}
                                        profileUrl={user.profileUrl}
                                    />

                                </div>

                            )

                        })}

                    </div>

                )}

            </div>

        </>
    )
}
export default Search;