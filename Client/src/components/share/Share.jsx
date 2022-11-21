import "./share.scss";
import Image from "../../assets/img.png";
import { useContext, useState } from "react";
import { AuthContext,PostContext } from "../../context/authContext";
import axios from "axios";

const Share = () => {
  
  const {posts,setPosts}=useContext(PostContext)

  const [file,setFile]=useState(null);
  
  const [desc,setDesc]=useState("");

  const {currentUser} = useContext(AuthContext);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res =  await axios.post("http://localhost:8800/api/upload", formData);
      return res.data;
    } 
    catch (err) 
    {
      console.log(err);
    }
  };

  const handleClick = async e=>
  {
      e.preventDefault();
      let imgUrl = "";
      if (file) imgUrl = await upload();
      const newpost=await axios.post("http://localhost:8800/api/posts/create",{desc,img:imgUrl,userID:currentUser._id});
      setPosts([newpost.data,...posts]);
      setDesc("");
      setFile(null);
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={"/upload/"+currentUser.profilepic}
              alt=""
            />
            <input type="text" placeholder={`What's on your mind ${currentUser.name}?`}  onChange={(e)=>setDesc(e.target.value)} value={desc}/>
          </div>
          <div className="right">
            {file && <img className="file" alt="" src={URL.createObjectURL(file)}></img>}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
