import {auth} from "../context/AuthProvider";
import { useRecoilValue } from "recoil";

const useAuth = () => {
    return useRecoilValue(auth);
}

export default useAuth;