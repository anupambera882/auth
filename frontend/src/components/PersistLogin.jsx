import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useRecoilState } from "recoil";
import { auth } from "../context/AuthProvider";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useRecoilState(auth);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await axios.get('auth/profile');
        const roles = response?.data?.response?.role;
        const user = response?.data?.response?.email;
        setUser({ user, accessToken: localStorage.getItem('jwt'), roles });
      }
      catch (err) {
        console.error(err);
      }
      finally {
        isMounted && setIsLoading(false);
      }
    }

    !user?.email ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false;
  }, [])

  return (
    <>
      {isLoading
        ? <p>Loading...</p>
        : <Outlet />
      }
    </>
  )
}

export default PersistLogin