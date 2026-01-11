import {useState} from "react";
import "./Login.css"

function Login(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [buttonDisabled,setButtonDisabled] = useState(false)
    const [users,setUsers] = useState([
        {username:"" ,password: ""}
    ])

    const rangeCheckUser =()=>{
        if (username.length === null)
            return false

        if (username.length>=4 && username.length <=10){
            return true
        }
    }

    const rangeCheckPassword =()=>{
        if (password.length === null)
            return false

        if (password.length>=8 && password.length <=20){
            return true
        }
    }

    const checkUserName =()=>{
        if (rangeCheckUser){
            return true
        }

        const checkUPassword =()=>{
            if (rangeCheckUser){
                return true
            }

            const addToListUsers =(username,password) =>{
                const tempLIst = [...users];
                const tempObject = tempLIst[username,password];
                if (checkUserName() && checkUPassword()){
                    while (checkUserName() && checkUPassword()){
                        tempLIst.push(username,password)
                    }
                    setUsers(tempLIst)
                }
                return users
            }
        }
    }

    return(
        <>
            <div className={"title"}>
                Social Network
            </div>


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
            </div>

            <div className={"login button"}>
                <button>
                    {/*disabled={rangeCheckUser ||rangeCheckPassword ||buttonDisabled}*/}
                    {/*    onClick={}*/}
                    signup
                </button>
            </div>
        </>
    );
}

export default Login
