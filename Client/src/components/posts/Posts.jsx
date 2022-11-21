import Post from "../post/Post";
import "./posts.scss";
import { useContext} from "react";
import { AuthContext, PostContext } from "../../context/authContext";

const Posts = (usr) => {

  const {currentUser} = useContext(AuthContext);

  const us=usr.usr;

  const {posts,rel,search}=useContext(PostContext);

  return <div className="posts">
    {posts.map((post)=>((post.userID===(us?us:currentUser._id)&&(post.postdesc.toLowerCase().includes(search.toLowerCase())))?<Post post={post} key={post.id} />:""))
    }
   {posts.map((post)=>(
        rel.map((re)=> 
        ((post.userID===re.followedID && re.followerID===(us?us:currentUser._id))&&(post.postdesc.includes(search)))?<Post post={post} key={post.id}/>:""
    )))}
  </div>;
};

export default Posts;
