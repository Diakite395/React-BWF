import { useContext, createContext, useState } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({user, children}) => {
  const [authData, setAuthData ] = useState(user);

  // On appel cette fonction au moment de login et sigin avec un User en comme argument 
  // et au moment de logout avec null en argument
  const setAuth = newUser => {
    if(newUser){
      localStorage.setItem('bwf-user', JSON.stringify(newUser));
    }else{
      localStorage.removeItem('bwf-user');
    }
    setAuthData(newUser)
  }

  // Le contenu value sera accessible dans tous les enfants
  return (
    <AuthContext.Provider value={{authData, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);