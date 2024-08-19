import { createContext, useEffect, useState } from "react";

interface User{
    id: string,
    userName: string,
    email: string,
    password?: string,
    cart?: any[],
    isLoggedIn: boolean,
    token?: string,

}
interface UserContextType{
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User> | null>

}


const UserContext = createContext<UserContextType>( {
    user: null,
    setUser: () => { }
});


export const UserProvider = () => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : { userName: '', email: '', password: '', cart: [], isLoggedIn: false, token: ''};
    })

    useEffect(() => {
        if(user.isLoggedIn){
            localStorage.setItem('user', JSON.stringify(user));
        }else{
            localStorage.removeItem('user');
        }
    }, [user])
    return {user, setUser}

    
}






export default UserContext;