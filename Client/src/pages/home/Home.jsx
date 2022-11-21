import { useContext } from "react"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import { AuthContext } from "../../context/authContext"
import "./home.scss"

const Home = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="home">
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home