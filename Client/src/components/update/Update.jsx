import { useContext, useState } from "react";
import "./update.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenupdate, user }) => {

    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const {setCurrentUser}=useContext(AuthContext);
    const [texts, setTexts] = useState({
        email: user.email,
        password: user.password,
        name: user.name,
        city: user.city,
        website: user.website,
    });

    const upload = async (file) => {
        try {
        const formData = new FormData();
        formData.append("file", file);
        const res= await axios.post("http://localhost:8800/api/upload",formData);
        return res.data;
        } catch (err) {
        console.log(err);
        }
    };
    
    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value][0] }));
    };

    const handleClick = async (e) => {
        e.preventDefault();        
        let coverUrl;
        const ID=user._id;
        let profileUrl;
        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;
        const newuser=await axios.put("http://localhost:8800/api/users",{uuser:{ ...texts, coverpic: coverUrl, profilepic: profileUrl},ID})
        setCurrentUser(newuser.data);
        setOpenupdate(false);
        setCover(null);
        setProfile(null);
    };

    return (
        <div className="update">
        <div className="wrapper">
            <h1>Update Your Profile</h1>
            <form>
            <div className="files">
                <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                    <img
                    src={
                        cover
                        ? URL.createObjectURL(cover)
                        : "/upload/" + user.coverPic
                    }
                    alt=""
                    />
                    <CloudUploadIcon className="icon" />
                </div>
                </label>
                <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(e) => setCover(e.target.files[0])}
                />
                <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                    <img
                    src={
                        profile
                        ? URL.createObjectURL(profile)
                        : "/upload/" + user.profilePic
                    }
                    alt=""
                    />
                    <CloudUploadIcon className="icon" />
                </div>
                </label>
                <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setProfile(e.target.files[0])}
                />
            </div>
            <label>Email</label>
            <input
                type="text"
                value={texts.email}
                name="email"
                onChange={handleChange}
            />
            <label>Password</label>
            <input
                type="text"
                value={texts.password}
                name="password"
                onChange={handleChange}
            />
            <label>Name</label>
            <input
                type="text"
                value={texts.name}
                name="name"
                onChange={handleChange}
            />
            <label>Country / City</label>
            <input
                type="text"
                name="city"
                value={texts.city}
                onChange={handleChange}
            />
            <label>Website</label>
            <input
                type="text"
                name="website"
                value={texts.website}
                onChange={handleChange}
            />
            <button onClick={handleClick}>Update</button>
            </form>
            <button className="close" onClick={() => setOpenupdate(false)}>
            close
            </button>
        </div>
        </div>
    )
}

export default Update;