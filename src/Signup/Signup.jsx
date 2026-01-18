import {useState} from "react";
import "./Signup.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";



function Signup(){

    const [name,setName] = useState("");
    const [lastName,setLastName] = useState("");
    const [phone,setPhone] = useState("");
    const [generalSex,setGeneralSex] = useState("");
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()



    const fullNameRegex =(value)=>{
        const fullName = /^[A-Za-z]{2,8}$/;
        return fullName.test(value.trim())
    }

    const phoneRegex =()=>{
        const phoneR = /^05\d{8}$/
        return phoneR.test(phone.trim())
    }




     const usernameRegex =()=>{
        const usernameR = /^[A-Za-z][A-Za-z0-9]{3,7}$/
        return usernameR.test(username.trim())
    }

     const passwordRegex =()=>{
        const passwordR =  /^[A-Z](?=.*[#!@])[A-Za-z0-9#!@]{7,19}$/


        return passwordR.test(password.trim())
    }
    const checkName = ()=>{
      let nameChack = true;
        if (name.trim().length === 0){
            nameChack = false;
            setError("Please enter a name")
        }
        else if (!fullNameRegex(name)){
            setError("Name must contain only letters")
            nameChack = false;

        }


       return nameChack
    }
    const checkLastName = ()=>{
        let lastChack = true;
        if (lastName.trim().length === 0){
            lastChack = false;
            setError("Please enter a last name")
        }
        else if (!fullNameRegex(lastName)){
            setError("The last name must contain only letters.")
            lastChack = false;
        }


        return lastChack
    }
    const checkPhone = ()=>{
        let PhoneChack = true;
        if (phone.trim().length === 0){
            PhoneChack = false;
            setError("Please enter a phone number.")
        }
        else if (!phoneRegex()){
            setError("Invalid phone number. Must start with 05 and contain 10 digits.")
            PhoneChack = false;

        }

        return PhoneChack
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
            setError(" password must start with a letter, be 8–20 characters long, and contain only English letters and numbers.")
            passwordChack = false;
        }

        return passwordChack
    }
    const chackGeneralSex =()=>{
        let generalCheck = true;
        if (generalSex.trim() === ""){
            setError("Please enter gender")
            generalCheck = false

        }
        return generalCheck

    }

    const validation = () => {
        setError("")
        let valid = true;
        if (!checkName() ||!checkLastName() || !checkPhone() ||!chackGeneralSex()||!checkUserName() || !checkPassword()){
            valid = false
        }else {
          apiSignup()

        }


    }
    const apiSignup= () => {
        axios.post("http://localhost:8080/signup-user",{name,lastName,phone,generalSex,username,password})
            .then((response =>{
                if (response.data.success){
                    navigate("/dashboard")

                }
                else {
                    setError("erroe");
                }
            }))

    }









    return (
       <>
           <div className="auth-page">
               <div className="blob b1" />
               <div className="blob b2" />
               <div className="grain" />

               <div className="auth-shell">
                   <div className="brand">
                       <div className="logo">SN</div>
                       <h1 className="brand-title">Registration</h1>
                       <p className="brand-sub">Create your account</p>
                   </div>

                   <div className="card">
                       <div className="card-frame" />
                       <div className="card-shine" />

                       <div className="card-inner">
                           <h2 className="card-title">Create a new account</h2>
                           <p className="card-subtitle">It’s quick and easy.</p>

                           {error && <div className="error-box">{error}</div>}

                           <div className="row-2">
                               <input
                                   className="input"
                                   placeholder="First name"
                                   type="text"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                               />

                               <input
                                   className="input"
                                   placeholder="Last name"
                                   type="text"
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                               />
                           </div>

                           <input
                               className="input"
                               placeholder="Phone number"
                               type="tel"
                               value={phone}
                               onChange={(e) => setPhone(e.target.value)}
                           />

                           <div className="field">
                               <div className="field-label">Gender</div>

                               <div className="gender-row two">
                                   <label className={`gender-pill ${generalSex === "female" ? "active" : ""}`}>
                                       <span>Female</span>
                                       <input
                                           type="radio"
                                           name="gender"
                                           value="female"
                                           checked={generalSex === "female"}
                                           onChange={(e) => setGeneralSex(e.target.value)}
                                       />
                                   </label>

                                   <label className={`gender-pill ${generalSex === "male" ? "active" : ""}`}>
                                       <span>Male</span>
                                       <input
                                           type="radio"
                                           name="gender"
                                           value="male"
                                           checked={generalSex === "male"}
                                           onChange={(e) => setGeneralSex(e.target.value)}
                                       />
                                   </label>
                               </div>
                           </div>

                           <input
                               className="input"
                               placeholder="Username"
                               type="text"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                           />

                           <input
                               className="input"
                               placeholder="Password"
                               type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                           />

                           <button className="btn-shine" onClick={validation}>
                               Sign Up
                           </button>
                       </div>
                   </div>
               </div>
           </div>
       </>
    );
    }
export default Signup