import { createContext ,useContext } from "react";
import { User } from "../interfeces/User";

export const UserContext = createContext<User | null>(null);

export function useUserContext(){
    const user = useContext(UserContext);
    if(user === null){
        throw new Error("useUserContext must be used with useContext")
    }
    return user;
}