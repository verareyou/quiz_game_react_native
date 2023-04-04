import { useContext, useState, createContext, useEffect } from "react";
import { getUser } from "../firebase/operations";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [ userscore, setUsercore ] = useState(0)

    const userData =  async () => {
        return  await getUser(user.uid);
    }

    const [listen, setListen] = useState()

    // useEffect(() => userData,[])

    return(
        <StateContext.Provider
            value={{
                user,
                setUser,
                userData,
                userscore,
                setUsercore,
                listen,
                setListen
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStore = () => useContext(StateContext)