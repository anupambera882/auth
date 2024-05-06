import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get('user/all', { signal: controller.signal });
        isMounted && setUsers(response.data.response);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    }

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [location, navigate])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, i) => <li key={i}>{user?.email}<br />{user?.phone} <br /><br /></li>)}
          </ul>
        ) : <p>No users to display</p>
      }
    </article>
  );
};

export default Users;