import { Link } from "react-router-dom";

function Navbar({profileImage}){

    return(

        <nav className="igNavbar">

            <Link className="igNavItem" to="/dashboard">
                <span className="igNavIcon">⌂</span>
                <span>Home</span>
            </Link>

            <Link className="igNavItem" to="/search">
                <span className="igNavIcon searchIcon">⌕</span>
                <span>Search</span>
            </Link>

            <Link className="igNavItem" to="/profile">
                <img
                    src={profileImage}
                    className="navProfileImg"
                    alt=""
                />
                <span>Profile</span>
            </Link>

        </nav>

    )
}

export default Navbar;