import { useState, useEffect, useContext } from "react";
import UserContext, {UserContextType, User} from "../context/UserContext";

export const useUserProvider = (): UserContextType => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        console.log(storedUser);
        return storedUser ? JSON.parse(storedUser) : null;
    
    });

    useEffect(() => {
        if (user && user.isLoggedIn) {
            localStorage.setItem("user", JSON.stringify(user));
        }else {
            localStorage.removeItem("user");
        }
    }, [user])
    return {
        user,
        setUser
    }



}
export const useUser = () => useContext(UserContext)