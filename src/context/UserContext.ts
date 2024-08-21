import { createContext } from "react";

export interface User {
    id: string,
    userName: string,
    email: string,
    password?: string,
    cart?: any[],
    isLoggedIn: boolean,
    token?: string,

}
export interface UserContextType{
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>

}


const UserContext = createContext<UserContextType>( {
    user: null,
    setUser: () => {}
});



export default UserContext;