import {useState} from "react";
import "./Signup.css"


function Signup(){
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

        if (password.length>=4 && password.length <=10){
            return true
        }


    }
    const checkUserName =()=>{
        if (rangeCheckUser){
        //    בבדיקה הזו צריך ללמוד את regex
        //     if ()
        // }
        //
        //
            return true

    }
        const checkUPassword =()=>{
            if (rangeCheckUser){
                //    בבדיקה הזו צריך ללמוד את regex
                //     if ()
                // }
                //
                //
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
          <div className={"signup"}>
              <input placeholder={"Please enter username"}
                     value={username}
                     onChange={(e) =>setUsername(e.target.value)}
                     min={4}
                     max={10}
              />
              <input placeholder={"Please enter password"}
                     value={password}
                     onChange={(e) =>setPassword(e.target.value)}
                     type={"password"}
                     min={4}
                     max={10}
              />
          </div>

          <div className={"signup button"}>

              <button >
                  {/*disabled={rangeCheckUser ||rangeCheckPassword ||buttonDisabled}*/}
                  {/*    onClick={}*/}


                  signup
              </button>





          </div>









      </>










    );

}
export default Signup