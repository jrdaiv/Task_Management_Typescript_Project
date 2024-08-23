import { createContext } from "react";

export interface User {
    id: string,
    username: string,
    email: string,
    password?: string,
    name: {
        firstname: string,
        lastname: string,
    },
    cart?: [],
    isLoggedIn: boolean,
    token?: string,

}


export interface UserContextType{
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>

}


const UserContext = createContext<UserContextType>( {
    user: null,
    setUser: () => {
        throw new Error("Function not implemented.");
    }
});



export default UserContext;