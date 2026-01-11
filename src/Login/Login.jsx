import {useState} from "react";
import "./Login.css"

function Login(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [buttonDisabled,setButtonDisabled] = useState(false)
    const [users,setUsers] = useState([
        {username:"" ,password: ""}
    ])
    // לבדוק עם אביה אם זה לא כפל קוד לבדוק פעמיים user ו סיסמה גם בדף הרשמה וגם בלןגין ואם זה לא כפל קוד גם להגדיר regex שוב פעמיים וגם error

    const usernameRegex =()=>{
        const usernameR = /^[A-Za-z][A-Za-z0-9]{3,7}$/
        return usernameR.test(username.trim())
    }

    const passwordRegex =()=>{
        const passwordR =/^[A-Za-z][A-Za-z0-9]{3,7}$/
        // רוצה להגביל סיסמה באורך 8-20 יכו להתחי באות גדולה או קטנה או מספר וחובה שיכלולל אחד מהתווים הבאים ₪%$#@!

        return passwordR.test(password.trim())
    }






    const checkUserName = ()=>{
        let userChack = true;
        if (username.trim().length === 0){
            userChack = false;
            setError("Please enter a user name")
        }
        else if (!usernameRegex()){
            setError("A username must start with a letter, be 4–8 characters long, and contain only English letters and numbers.")
            userChack = false;
        }

        return userChack
    }
    const checkPassword = ()=>{
        let passwordChack = true;
        if (password.trim().length === 0){
            passwordChack = false;
            setError("Please enter a password")
        }
        else if (!passwordRegex()){
            setError("")
            passwordChack = false;

        }

        return passwordChack
    }

            const addToListUsers =(username,password) =>{
                const tempLIst = [...users];
                const tempObject = tempLIst[username,password];
                if (checkUserName() && checkPassword()){
                    while (checkUserName() && checkPassword()){
                        tempLIst.push(username,password)
                    }
                    setUsers(tempLIst)
                }
                return users
            }
            const validation =() =>{
        setError("")
              if (!checkUserName()){
                  return false;
              }
              if (!checkPassword()){
                  return false;
              }
              else {
              //     לבדוק קריאת api ולצרף לרשימת user
              }



            }



    return(
        <>
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
                <button onClick={validation}>
                    Login
                </button>
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
