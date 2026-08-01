// import { createContext, useContext, useState } from "react";
// import { getToken, removeToken, setToken } from "../utils/storage";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {

//     const [isAuthenticated, setIsAuthenticated] = useState(
//         !!getToken()
//     );

//     // const login = (token) => {
//     //     setToken(token);
//     //     setIsAuthenticated(true);
//     // };

//      const login = (token, user) => {
//         setToken(token);
//         setIsAuthenticated(true);
//     };

//     const logout = () => {
//         removeToken();
//         setIsAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 isAuthenticated,
//                 login,
//                 logout,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

// export const useAuth = () => useContext(AuthContext);




import { createContext, useContext, useState } from "react";
import { getToken, removeToken, setToken } from "../utils/storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!getToken()
    );

    const [user, setUser] = useState(null);

    const login = (token, user) => {


        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeToken();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);