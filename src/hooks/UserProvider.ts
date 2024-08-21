import { useState, useEffect } from "react";
import {UserContextType, User} from "../context/UserContext";

export const useUserProvider = (): UserContextType => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        console.log(storedUser);
        return storedUser ? JSON.parse(storedUser) : null;
    
    });

    useEffect(() => {
        if (user && user.isLoggedIn) {
            sessionStorage.setItem("user", JSON.stringify(user));
        }else {
            sessionStorage.removeItem("user");
        }
    }, [user])
    return {
        user,
        setUser
    }



}