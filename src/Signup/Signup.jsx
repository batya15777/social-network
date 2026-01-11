import {useState} from "react";
import "./Signup.css"



function Signup(){

    const [name,setName] = useState("");
    const [lastName,setLastName] = useState("");
    const [phone,setPhone] = useState("");
    //
    const [generalSex,setGeneralSex] = useState("");
    //
    // const [years,setYears] = useState([])
    // const [month,setMonth] = useState([])
    // const [day,setDay] = useState([])

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const [error,setError] = useState("")


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
        const passwordR =/^[A-Za-z][A-Za-z0-9]{3,7}$/
         // רוצה להגביל סיסמה באורך 8-20 יכו להתחי באות גדולה או קטנה או מספר וחובה שיכלולל אחד מהתווים הבאים ₪%$#@!

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
            setError("")
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
        if (!checkName()){
            return false
        }
        if (!checkLastName()){
            return false
        }
        if (!checkPhone()){
            return false
        }
        if (!chackGeneralSex()){
            return false
        }
        if (!checkUserName()){
            return false
        }
        if (!checkPassword()){
            return false
        }else {
        //     לבדוק עם אביה עם פה צריך לבצע קריאת api שיבדוק עם הuser קיים ואם צריך פה ליצור מערך של users כמו בלוגין רבל פה האובייקט גדול יותר כי הצטרף לי עוד פרטים
        }



       return true;

    }









    return (
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
    );
    }
export default Signup