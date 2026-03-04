// import {useEffect, useState} from "react";
// import axios, {get} from "axios";
// import Cookies from "js-cookie";



function Dashboard (){
    const [userName,setUserName]  = useState('');

    useEffect(() => {
        axios.post("http://localhost:8080/show-user",{token:token})
            .then((response =>
                    setUserName(response.data.username)
            ))

    }, []);
    const token = Cookies.get("token")


    return(
        <div>

            DDDD
        </div>
    );
}




export default Dashboard;