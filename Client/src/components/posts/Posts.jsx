import Post from "../post/Post"; 
import { useContext} from "react";
import { AuthContext, PostContext } from "../../context/authContext";

const Posts = (usr) => {
  const {currentUser} = useContext(AuthContext);
  const us=usr.usr;
  const {posts,rel,search}=useContext(PostContext);
  return (<div className="posts">
    {
      posts.map(post=>post.userID===currentUser._id?<Post  post={post} key={post.id}/>:"")
    }
  </div>);
};

export default Posts;
