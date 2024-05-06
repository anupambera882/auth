import { useNavigate, Link } from "react-router-dom";
import { auth } from "../context/AuthProvider";
import { useSetRecoilState } from "recoil";

const Home = () => {
  const setAuth = useSetRecoilState(auth);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 
    setAuth({});
    localStorage.removeItem('jwt');
    navigate('/linkpage');
  }

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  )
}

export default Home