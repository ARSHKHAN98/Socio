import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext,PostContext } from "../../context/authContext";

const Navbar = () => {
  
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const {setSearch}=useContext(PostContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Socio</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/>
        </div>
      </div>
      <div className="right">
        <div className="user">
          <img
            src={"/upload/"+currentUser.profilepic}
            alt=""
          />
         <Link
                to={`/profile/${currentUser._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{currentUser.name}</span>
              </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
