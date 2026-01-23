import {useState} from "react";
import "./Login.css"
import Cookies from "js-cookie";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Login(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()

    // const [buttonDisabled,setButtonDisabled] = useState(false)








    const checkUserName = ()=>{
        let userChack = true;
        if (username.trim().length === 0){
            userChack = false;
            setError("Please enter a user name")
        }

        return userChack
    }
    const checkPassword = ()=>{
        let passwordChack = true;
        if (password.trim().length === 0){
            passwordChack = false;
            setError("Please enter a password")
        }


        return passwordChack
    }


      const validation =(event) =>{
         event.preventDefault();
             setError("")
              let valid = true;
              if (!checkUserName() || !checkPassword()){
                  valid = false;
              }
              if (valid){
                  apiRequest()

              }

            }
            const apiRequest = ()=>{
             axios.post("http://localhost:8080/login",{username,password})
                 .then(response =>{
                     if (response.data.success){
                         console.log(response.data)
                         Cookies.set("token",response.data.token)
                         navigate("/dashboard")



                     }

                 })
                  setError("Server error. Please try again.")
            }

            const registrationPage = () =>{
                  navigate("/signup-user")
            }



    return(
     <>
     <form onSubmit={validation}>
         <div className={"title"}>
             Social Network
         </div>

         {error && <div className="error-box">{error}</div>}

         <div className={"login"}>
             <input
                 placeholder={"Please enter username"}
                 value={username}
                 onChange={(e) =>setUsername(e.target.value)}
                 min={4}
                 max={8}
             />
             <input
                 placeholder={"Please enter password"}
                 value={password}
                 onChange={(e) =>setPassword(e.target.value)}
                 type={"password"}
                 min={8}
                 max={20}
             />
             <button

                type={"submit"}>

                 Login
         </button>
     </div>


     </form>
         <div className={"login button"}>
             <button onClick={registrationPage}>

                 Create a new account
             </button>
         </div>
     </>
    );
}

export default Login
